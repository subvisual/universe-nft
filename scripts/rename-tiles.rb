#!/usr/bin/env ruby

Dir.glob("*.png").each do |f|
  name = File.basename(f, ".png")

  x, y = name.split(/[xX]/)

  x2 = x.to_i - 1
  y2 = y.upcase.ord + 35

  File.rename(f, "#{x2}x#{y2}.png")
end
