import * as React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
// import { specs } from 'storybook-addon-specifications'
// import { deepKeyTests } from './deepKey.test'
import deepKeyNotInitNotes from './deepKeyNotInitNotes.md'
import deepKeyInitNoKeysNotes from './deepKeyInitNoKeysNotes.md'
import deepKeyInitKeysNotes from './deepKeyInitKeysNotes\.md'

// import deepKeyInitNotes from './deepKeyInitNotes.md'

import CreateStore from '../../../../store'
import DeepKeyOverview, { Props } from '../deepKeyOverview'
import { Rule, Authorizer, KeyMeta, KeyType } from '../../types/deepKey' // , RevParams, AuthParams

let store = CreateStore()

const mockRule: Rule = {
  keysetRoot: 'QmKeySetHash',
  revocationKey: 'QmRevocationKeyHash',
  priorRevocationSelfSig: null
}

const mockAuthorizer: Authorizer = {
  authorizationKey: 'QmAuthKeyHash',
  revocationAuthority: 'QmRevocationAuthorityHash',
  revocationSig: 'QmMockRevocationKeySignatureofAuthKey'
}

const keyMetaMockData: KeyMeta = {
  newKey: 'QmMockNewKeyHash',
  derivationIndex: 1,
  keyType: KeyType.AppSig, // enum vlaue
  context: 'QmMockHcDNAHash'
}

// const setMockAuthUpdateArgs: AuthParams = {
//   authorizationKeyPath: 1,
//   signedAuthKey:'QmAuthKeyMockHash'
// }

// const revRulesParams: RevParams = {
//   revocationKey: 'QmRevocationKeyMockHash',
//   signedOldRevocationKey: 'HCSprevSignedKeyHash'
// }

let props: Props = {
  isInitialized: true,
  revocationRuleSet: {
    keysetRoot: 'QmKeySetHash',
    revocationKey: 'QmRevocationKeyHash'
  },
  allKeys: [
    {
      address: 'QmKeyHash',
      keyType: KeyType.AppEnc
    }
  ],
  address: undefined,
  keyType: undefined,
  authorizerKeySet: {
    authorizationKey: 'qmssss',
    revocationAuthority: 'adsdfgfsd', // Hash of the Rule entry
    revocationSig: 'my sig' // NOTE: Signed by Rev Key (stored in RUle), ie signed by the Trusted Revocation Auth Party via the Signatory hApp, only done at the actual creation of the Authorization Key
  },
  fetchIsInitialized: jest.fn(() => Promise.resolve(true)),
  fetchRevocationRules: jest.fn(() => Promise.resolve([{ address: 'HcsMmockAddressHash', entry: mockRule }])),
  // updateRevocationRules: jest.fn((revRulesParams:RevParams) => Promise.resolve('QmRevocationRuleEntryAddressHash')),
  // updateRevocationRules: jest.fn(),
  fetchAuthorizer: jest.fn(() => Promise.resolve(mockAuthorizer)),
  // setAuthorizer: jest.fn((setMockAuthUpdateArgs:AuthParams) => Promise.resolve('QmEntryAddressHash')),
  // setAuthorizer: jest.fn(),
  fetchAllKeys: jest.fn(() => Promise.resolve([keyMetaMockData])),
  updateKey: jest.fn(),
  deleteKey: jest.fn() // ,
  // createAgent: jest.fn((args) => (args) => {})
  // createAgent: jest.fn((args) => Promise.resolve(true)
}

storiesOf('Deep Key Overview', module)
// 1. Init (with revocationKey that is pre-generated by Agent, and added to the Conductor)
  .add('Initialized, with RevocationRuleSet & Keys', () => {
    // specs(() => personaListTests)
    props = {
      ...props,
      isInitialized: true,
      revocationRuleSet: {
        keysetRoot: 'QmKeySetHash',
        revocationKey: 'QmRevocationKeyHash'
      },
      allKeys: [
        {
        address: 'QmKeyHash',
        keyType: KeyType.AppEnc
        }
      ]
    }
    return getDeepKeyOverview()
  },
  {
    notes: { markdown: deepKeyInitKeysNotes }
  })
  .add('Initialized, with RevocationRuleSet but No Keys', () => {
    // specs(() => personaListTests)
    props = {
      ...props,
      isInitialized: true,
      revocationRuleSet: {
        keysetRoot: 'QmKeySetHash',
        revocationKey: 'QmRevocationKeyHash'
      },
      allKeys: []
    }
    return getDeepKeyOverview()
  },
  {
    notes: { markdown: deepKeyInitNoKeysNotes }
  })
  .add('Not Initialized, No RevocationRuleSet & No Keys', () => {
    // specs(() => personaListTests)
    props = {
      ...props,
      isInitialized: false,
      revocationRuleSet: undefined,
      allKeys: []
    }
    return getDeepKeyOverview()
  },
  {
    notes: { markdown: deepKeyNotInitNotes }
  })
  // 2. Display Revocation Key (apart of the Rule Struct) > GetRevocationRules
  // .add('Edit Existing deepKey', withNotes(editdeepKeyNotes)(() => {
  //   specs(() => DeepKeyTests)
  //   return getdeepKey(editdeepKey)
  // })
  //

  // 3. Display & Allow Option to UPDATE Revocation Key >>  update_rules:
  // .add('Edit Existing deepKey', withNotes(editdeepKeyNotes)(() => {
  //   specs(() => DeepKeyTests)
  //   return getdeepKey(editdeepKey)
  // })

  // 4. Create Auth Key > SetAuthorizer:
  // .add('Edit Existing deepKey', withNotes(editdeepKeyNotes)(() => {
  //   specs(() => DeepKeyTests)
  //   return getdeepKey(editdeepKey)
  // })
  //

  // 5. Display Auth Key >  GetAuthorizer
  // .add('Edit Existing deepKey', withNotes(editdeepKeyNotes)(() => {
  //   specs(() => DeepKeyTests)
  //   return getdeepKey(editdeepKey)
  // })

  // 6. Create Agent Keys (sign/enc) > invoke ADMIN Call to Conductor to create agents >
  // .add('Edit Existing deepKey', withNotes(editdeepKeyNotes)(() => {
  //   specs(() => DeepKeyTests)
  //   return getdeepKey(editdeepKey)
  // })

  // 7. Display Agent Keys (sign/enc) > GetAllKeys
  // .add('Edit Existing deepKey', withNotes(editdeepKeyNotes)(() => {
  //   specs(() => DeepKeyTests)
  //   return getdeepKey(editdeepKey)
  // })

  // !! >> potentially 7.b. === Display Key Status >  key_status !!

  // 8. Display & Allow Option to UPDATE  Agent Key >> UpdateKey
  // .add('Edit Existing deepKey', withNotes(editdeepKeyNotes)(() => {
  //   specs(() => DeepKeyTests)
  //   return getdeepKey(editdeepKey)
  // })

  // 9. Display & Allow Option to REVOKE/DELETE Agent Key >> DeleteKey
  // .add('Edit Existing deepKey', withNotes(editdeepKeyNotes)(() => {
  //   specs(() => DeepKeyTests)
  //   return getdeepKey(editdeepKey)
  // })

function getDeepKeyOverview () {
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <DeepKeyOverview {...props}/>
      </MemoryRouter>
    </Provider>)
}
