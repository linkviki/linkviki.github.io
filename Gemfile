source "https://rubygems.org"

# Manage Jekyll version
gem "jekyll", "~> 3.9.2"

# Default theme for new Jekyll sites
gem "minima", "~> 2.5"

# If you want to use GitHub Pages
gem "github-pages", "~> 227", group: :jekyll_plugins

# Plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
  gem "jekyll-paginate"
end

# Windows and JRuby dependencies
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance booster for watching directories on Windows
# gem "wdm", "~> 0.1.1", platforms: [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem do not have a Java counterpart
gem "http_parser.rb", "~> 0.6.0", platforms: [:jruby]

# Additional themes
gem "minimal-mistakes-jekyll"
