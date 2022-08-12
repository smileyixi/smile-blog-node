# 霜冷博客系统nodejs服务端代码

> 需要配合前端页面使用则访问项目：https://github.com/smileyixi/smile-blog-vue
> v1.0.0

# 用户

## POST 用户注册

POST /api/user/register

> Body 请求参数

```json
{
  "username": "root",
  "password": "passwd",
  "autograph": "just so so..."
}
```

### 请求参数

| 名称 | 位置 | 类型   | 必选 | 说明 |
| ---- | ---- | ------ | ---- | ---- |
| body | body | object | 否   | none |

> 返回示例

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

## POST 用户登陆

POST /api/user/login

> Body 请求参数

```json
{
  "username": "smilesl",
  "passwored": "moyans"
}
```

### 请求参数

| 名称 | 位置 | 类型   | 必选 | 说明 |
| ---- | ---- | ------ | ---- | ---- |
| body | body | object | 否   | none |

> 返回示例

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

# 文章

## POST 更新文章

POST /api/blog/update

> Body 请求参数

```json
{
  "id": "62f39849cc6de010e0631684",
  "title": "更新文章测试"
}
```

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| authorization | cookie | string | 是   | none |
| body          | body   | object | 否   | none |

> 返回示例

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

## GET 上一篇文章

GET /api/blog/pre

### 请求参数

| 名称 | 位置  | 类型   | 必选 | 说明 |
| ---- | ----- | ------ | ---- | ---- |
| id   | query | string | 是   | none |

> 返回示例

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

## GET 分类下的文章

GET /api/blog/cateArt

### 请求参数

| 名称 | 位置  | 类型   | 必选 | 说明 |
| ---- | ----- | ------ | ---- | ---- |
| cid  | query | string | 否   | 分类 |

> 返回示例

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

## GET 分页查询

GET /api/blog/list

### 请求参数

| 名称  | 位置  | 类型   | 必选 | 说明 |
| ----- | ----- | ------ | ---- | ---- |
| skip  | query | string | 否   | none |
| limit | query | string | 否   | none |

> 返回示例

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

## GET 文章详情

GET /api/blog/articleDetail

### 请求参数

| 名称 | 位置  | 类型   | 必选 | 说明 |
| ---- | ----- | ------ | ---- | ---- |
| id   | query | string | 否   | none |
| cid  | query | string | 否   | none |

> 返回示例

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

## POST 新增文章

POST /api/blog/new

> Body 请求参数

```json
{
  "title": "测试文章1",
  "hot": 15,
  "cid": "62d772d1bfff1308e6d3e9fa",
  "uid": "62d78079753c170db83ad22a",
  "author": "root",
  "content": "test content"
}
```

### 请求参数

| 名称 | 位置 | 类型   | 必选 | 说明 |
| ---- | ---- | ------ | ---- | ---- |
| body | body | object | 否   | none |

> 返回示例

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

## GET 下一篇文章

GET /api/blog/next

### 请求参数

| 名称 | 位置  | 类型   | 必选 | 说明 |
| ---- | ----- | ------ | ---- | ---- |
| id   | query | string | 是   | none |

> 返回示例

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

## POST 删除文章

POST /api/blog/del

> Body 请求参数

```json
{
  "id": "62eb2dbbbd07100c45e04d92"
}
```

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| authorization | cookie | string | 是   | none |
| body          | body   | object | 否   | none |

> 返回示例

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

# 分类

## POST 新增分类

POST /api/category/new

> Body 请求参数

```json
{
  "title": "默认分类",
  "description": "只是个默认分类"
}
```

### 请求参数

| 名称 | 位置 | 类型   | 必选 | 说明 |
| ---- | ---- | ------ | ---- | ---- |
| body | body | object | 否   | none |

> 返回示例

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

## GET 分类列表

GET /api/category/list

### 请求参数

| 名称  | 位置  | 类型   | 必选 | 说明 |
| ----- | ----- | ------ | ---- | ---- |
| limit | query | string | 否   | none |

> 返回示例

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

## GET 查询分类

GET /api/category

### 请求参数

| 名称 | 位置  | 类型   | 必选 | 说明 |
| ---- | ----- | ------ | ---- | ---- |
| cid  | query | string | 是   | none |

> 返回示例

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

## GET 聚合分类数量

GET /api/category/count

### 请求参数

| 名称 | 位置  | 类型   | 必选 | 说明 |
| ---- | ----- | ------ | ---- | ---- |
| cid  | query | string | 否   | none |

> 返回示例

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

# 评论

## GET 评论总数

GET /api/comment/count

### 请求参数

| 名称 | 位置  | 类型   | 必选 | 说明   |
| ---- | ----- | ------ | ---- | ------ |
| aid  | query | string | 否   | 文章id |

> 返回示例

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

## GET 获取评论

GET /api/comment/list

### 请求参数

| 名称  | 位置  | 类型   | 必选 | 说明 |
| ----- | ----- | ------ | ---- | ---- |
| aid   | query | string | 否   | none |
| limit | query | string | 否   | none |

> 返回示例

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

## POST 插入评论

POST /api/comment/new

> Body 请求参数

```json
"{\n    \"author\": \"smilesl\",\n    \"aid\": \"62d97ba3fa22541bc6b8114b\",\n    \"content\": \"这只是一条评论罢了～\",\n}"
```

### 请求参数

| 名称       | 位置   | 类型   | 必选 | 说明 |
| ---------- | ------ | ------ | ---- | ---- |
| User-Agent | header | string | 否   | none |
| body       | body   | string | 否   | none |

> 返回示例

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

# 页面

## GET 查询页面

GET /api/pages

### 请求参数

| 名称 | 位置  | 类型   | 必选 | 说明 |
| ---- | ----- | ------ | ---- | ---- |
| page | query | string | 否   | none |

> 返回示例

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

## POST 新增页面

POST /api/pages/new

> Body 请求参数

```json
"{\n    \"title\": \"测试页面\",\n    \"page\": \"test\"\n    \"content\": \"test page\",\n    \"disComment\": \"0\"\n}"
```

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| authorization | cookie | string | 否   | none |
| body          | body   | object | 否   | none |

> 返回示例

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

# 图床

## POST 上传图片

POST /api/v2/upload

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |
| Content-Type  | header | string | 否   | none |

> 返回示例

> 成功

```json
{
  "success": true,
  "code": "success",
  "message": "Upload success.",
  "data": {
    "file_id": 0,
    "width": 4677,
    "height": 3307,
    "filename": "luo.jpg",
    "storename": "D5VpWCKFElUsPcR.jpg",
    "size": 801933,
    "path": "/2019/12/16/D5VpWCKFElUsPcR.jpg",
    "hash": "Q6vLIbCGZojrMhO2e7BmgFuXRV",
    "url": "https://vip1.loli.net/2019/12/16/D5VpWCKFElUsPcR.jpg",
    "delete": "https://sm.ms/delete/Q6vLIbCGZojrMhO2e7BmgFuXRV",
    "page": "https://sm.ms/image/D5VpWCKFElUsPcR"
  },
  "RequestId": "8A84DDCA-96B3-4363-B5DF-524E95A5201A"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

## POST 获取token

POST /api/v2/token

> Body 请求参数

```json
{
  "username": "'smileyixi",
  "password": "asdf1234"
}
```

### 请求参数

| 名称 | 位置 | 类型   | 必选 | 说明 |
| ---- | ---- | ------ | ---- | ---- |
| body | body | object | 否   | none |

> 返回示例

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | 成功 | Inline   |

### 返回数据结构

# 数据模型

