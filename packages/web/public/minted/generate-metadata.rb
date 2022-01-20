#!/usr/bin/env ruby

require 'json'

Dir.glob("*.png").each do |f|
  coords = f.gsub(".png", "")
  mfile = "#{coords}.json"


  if File.file?(mfile)
    next
  end

  File.open(mfile, "w") do |h|
    data = {
      images: {
        "200x200": "https://holidays.subvisual.com/minted/#{coords}.png"
      }
    }

    h.write(JSON.pretty_generate(data))

  end

  p mfile
end
