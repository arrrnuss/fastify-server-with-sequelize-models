const schemaEnv = {
  type: 'object',
  required: [ 'PORT' ],
  properties: {
    PORT: {
      type: 'string',
      default: 3000
    },
    DB_HOST: {
      type: 'string'
    },
    DB_PORT: {
      type: 'string'
    },
    DB_USER: {
      type: 'string'
    },
    DB_PASSWORD: {
      type: 'string'
    },
    DB_DATABASE_NAME: {
      type: 'string'
    },
    DB_HOST2: {
      type: 'string'
    },
    DB_PORT2: {
      type: 'string'
    },
    DB_USER2: {
      type: 'string'
    },
    DB_PASSWORD2: {
      type: 'string'
    },
    DB_DATABASE_NAME2: {
      type: 'string'
    },
    SECERT_KEY: {
      type: 'string'
    },
    AWS_S3_ACCESS_KEY_ID: {
      type: 'string'
    },
    AWS_S3_SECRET_ACCESS_KEY: {
      type: 'string'
    },
    AWS_S3_STORAGE_BUCKET_NAME: {
      type: 'string'
    },
    URL_IMAGE:{
      type: 'string'
    }
  }
}

module.exports = {
  schemaEnv
}