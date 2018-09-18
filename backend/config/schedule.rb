every :sunday, at: '1am' do
  command "rails runner lib/script/update_metrics.rb"
end
