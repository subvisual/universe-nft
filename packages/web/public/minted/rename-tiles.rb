#!/usr/bin/env ruby

Dir.glob("*.png.old") do |f|
  name=File.basename(f, ".png.old")

  y, x = name.split("x")

  File.rename(f, "#{x}x#{y}.png")
end
