#!/usr/bin/env ruby

require 'json'

Dir.glob("*.json").each do |f|
  coords = f.gsub(".json", "")

  data = JSON.parse File.read(f)

  data["image"] = "https://holidays.subvisual.com/minted/1000x1000/#{coords}.png"
  data["images"] ||= {}
  data["images"]["200x200"] = "https://holidays.subvisual.com/minted/200x200/#{coords}.png"
  data["images"]["1000x1000"] ||= "https://holidays.subvisual.com/minted/1000x1000/#{coords}.png"

  File.open(f, "w") do |h|
    h.write(JSON.pretty_generate(data))
  end
end
