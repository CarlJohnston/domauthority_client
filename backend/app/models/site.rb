class Site < ApplicationRecord
  VALID_INCLUDES = {
    Metric.name.downcase.pluralize => true,
  }.with_indifferent_access

  has_many :user_sites
  has_many :users, through: :user_sites
  has_many :metrics

  attr_accessor :title

  def as_json options={}
    additional_fields = {}

    additional_fields.merge!({
      title: title,
    })

    if options.has_key?(:include)
      options[:include].each do |include|
        if VALID_INCLUDES[include]
          additional_fields.merge!({
                                     include => self.send(include).as_json,
                                   })
        end
      end

      options.delete(:include)
    end

    super(options).merge(additional_fields)
  end
end
