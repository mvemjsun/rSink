class Constants
  @@serverLogUrl = 'http://localhost:9294/api/requestlog/range'
  @@serverSinkUrl = 'http://localhost:9294/'
  @@serverCleanUrl = 'http://localhost:9294/api/reset/requestlog'

  class << self
    def serverLogUrl
      @@serverLogUrl
    end

    def serverSinkUrl
      @@serverSinkUrl
    end

    def serverCleanUrl
      @@serverCleanUrl
    end
  end
end