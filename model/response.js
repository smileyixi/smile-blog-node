/**
 * 返回数据模型
 */

class BaseModel{
    constructor(data, msg) {
        if (typeof data === 'string') {
            this.msg = data
            data = null
        }
        if(data) this.data = data
        if(msg) this.msg = msg
    }
}

class SuccessModel extends BaseModel{
    constructor(data, msg) {
        super(data, msg)
        this.error = 0
    }
}

class ErrorModel extends BaseModel{
    constructor(data, msg) {
        super(data, msg)
        this.error = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}