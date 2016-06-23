curl -X POST \
  -H "X-Parse-Application-Id: HurQRNhOKqk12EmbqokCcpDGyOJkXvAZCFc3yBTy" \
  -H "X-Parse-Master-Key: U6joLXJWthhRB4iG1aFK6GVl6PpBC9mWCJlIZG0P" \
  -H "Content-Type: application/json" \
  -d '{"score":1337,"playerName":"Sean Plott","cheatMode":false}' \
  https://rocky-savannah-73915.herokuapp.com/parse/classes/Test

curl -X GET \
  -H "X-Parse-Application-Id: HurQRNhOKqk12EmbqokCcpDGyOJkXvAZCFc3yBTy" \
  -H "X-Parse-Master-Key: U6joLXJWthhRB4iG1aFK6GVl6PpBC9mWCJlIZG0P" \
  https://rocky-savannah-73915.herokuapp.com/parse/classes/Test
