require 'openssl'
require 'base64'
require 'cgi'
require 'json'
require 'net/http'
require 'uri'

class Fetcher
  ACCESS_ID = ENV['DOMAUTHORITY_MOZ_ACCESS_ID']
  SECRET_KEY = ENV['DOMAUTHORITY_MOZ_SECRET_KEY']

  MAX_BATCH = 10

  EXPIRES_OFFSET	= 300

  # Root Domain      - 16
  # Moz Rank         - 65536
  # Page Authority   - 34359738368
  # Domain Authority - 68719476736
  COLS = '103079280656'

  def self.url_metrics sites
    if ACCESS_ID.nil? || SECRET_KEY.nil?
      raise Fetcher::Exceptions::Unauthorized
    elsif sites.empty? || sites.length > MAX_BATCH
      raise Fetcher::Exceptions::RequestError
    else
      string_to_sign = "#{ACCESS_ID}\n#{expires}"

      binary_signature = OpenSSL::HMAC.digest('sha1', SECRET_KEY, string_to_sign)

      url_safe_signature = CGI::escape(Base64.encode64(binary_signature).chomp)

      request_url = "http://lsapi.seomoz.com/linkscape/url-metrics/?Cols=#{COLS}&AccessID=#{ACCESS_ID}&Expires=#{expires}&Signature=#{url_safe_signature}"

      uri = URI.parse("#{request_url}")
      http = Net::HTTP.new(uri.host, uri.port)
      request = Net::HTTP::Post.new(uri.request_uri)
      request.body = sites.to_json

      response = http.request(request)

      case response
      when Net::HTTPSuccess
        response.body
      when Net::HTTPUnauthorized
        raise Fetcher::Exceptions::Unauthorized
      when Net::HTTPInternalServerError
        raise Fetcher::Exceptions::ServerError
      else
        raise Fetcher::Exceptions::UnexpectedError
      end
    end
  end

  module Exceptions
    class RequestError < Exception
    end

    class Unauthorized < Exception
    end

    class ServerError < Exception
    end

    class UnexpectedError < Exception
    end
  end

  private
    def self.expires
      Time.now.to_i + EXPIRES_OFFSET
    end
end
