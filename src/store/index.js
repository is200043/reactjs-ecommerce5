import { init } from '@rematch/core'
import * as models from './models'
import createRematchPersist from '@rematch/persist'
import createSelectPlugin from '@rematch/select'

const persistPlugin = createRematchPersist({
  whitelist: ['user'],
  throttle: 5000,
  version: 1,
})
const selectPlugin = createSelectPlugin()

const store = init({
  models,
  plugins: [persistPlugin, selectPlugin]
})

export default store