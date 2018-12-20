# Выдача первых n RSS-новостей с [Node.js feed](https://nodejs.org/en/feed/blog.xml)

Установка:

```bash
$ yarn
```

Запуск сервера:

```bash
$ yarn start
```

Пример запроса curl:

```bash
$ curl http://localhost:1234 -X POST -H "Content-Type: application/json" -d '{"n":"3"}'
```

Сервер выдает соответственно массив объектов с ключами `title` и `link`
