curl -X POST \
  -H "X-Parse-Application-Id: EW02RQhhvjE3B58YDgbo87dqRWYCiJeZyusD8ll7" \
  -H "Content-Type: application/json" \
  -d '{"score":1337,"playerName":"Sean Plott","cheatMode":false}' \
  http://localhost:1337/parse/classes/Test

curl -X GET \
  -H "X-Parse-Application-Id: EW02RQhhvjE3B58YDgbo87dqRWYCiJeZyusD8ll7" \
  -H "X-Parse-Master-Key: UTu46JdJfO7VrD30GkmMJHAL5TgqQysLgh24JZlf" \
  http://localhost:1337/parse/classes/Test
