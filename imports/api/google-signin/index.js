import { ServiceConfiguration } from 'meteor/service-configuration'
import { googleClientID, googleClientSecret } from '../../config/keys'

ServiceConfiguration.configurations.upsert(
  { service: 'google' },
  {
    $set: {
      loginStyle: 'popup',
      clientId: googleClientID,

      secret: googleClientSecret

    }
  }
)
