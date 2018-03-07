require_relative './Constants'
require 'rest-client'
require 'pp'

class SampleLogWriter

  def self.writeSamplePosts
    (1..10).each do |num|
      postUrl = Constants.serverSinkUrl + "post/number/#{num}"
      RestClient.post(url = postUrl, payload = "val1=one&val2=two&val3=#{num}&val4=&.c=&last=99",
                      headers = {'x-post-header' => 1, 'content-type' => 'text/plain', 'x-time' => Time.now})
    end
  end
end

class LogCleaner
  def self.resetLogs
    url = Constants.serverCleanUrl
    RestClient.post(url, payload = '')
  end
end


class LogReader

  def self.getLogs(fromDateTime, toDateTime)
    url = Constants.serverLogUrl + "?from=#{fromDateTime}&to=#{toDateTime}"
    resp = RestClient.get(URI.encode(url))
    return JSON.parse(resp) # Response is a array of JSONs
  end

  #
  # Process logs and return a hash
  #
  def self.processLogs(response)
    logs = {}
    row=0
    response.each do |log| # Loop through each JSON
      row += 1
      responseBody = log['body'] # Get body of Log JSON
      formFields = responseBody.split('&').map { |kValuePair| kValuePair.split('=') } # Get Each form field key and value
      formHash = {}
      formFields.each do |k,v| # build an hash `formHash` with all formFields
        formHash[k] = v.nil? ? '' : URI.decode(v)
      end

      logs[row] = formHash # Store row data in `logs` hash
    end
    pp logs
    return logs
  end
end

LogCleaner.resetLogs
sleep 2

startTime=Time.now.strftime('%Y-%m-%d %H:%M:%S')
#10 POSTs
SampleLogWriter.writeSamplePosts
endTime=Time.now.strftime('%Y-%m-%d %H:%M:%S')

logs = LogReader.getLogs(startTime, endTime)
LogReader.processLogs(logs)
