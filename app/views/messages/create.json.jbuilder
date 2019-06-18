json.(@message, :message, :image)
json.created_at   @message.created_at
json.name         @message.user.name
json.url          @message.image.url
json.image        @message.image
json.id           @message.id