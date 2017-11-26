//@flow

/*This should actually be an enumeration of all the fields on file data type*/

export type Claim = {
  address: string,
  amount: number,
  blocks_to_expiration: number,
  category: string,
  claim_id: string,
  confirmations: number,
  decoded_claim: boolean,
  expiration_height: number,
  expired: boolean,
  has_signature: boolean,
  height: number,
  is_pending: boolean,
  is_spent: boolean,
  name: string,
  nout: number,
  txid: string,
  value: {
    claimType: string,
    stream: {
      metadata: {}, //this probably ought to be defined as it's own type
      source: {
        contentType: string,
        source: string, //this is a stream descriptor hash for lbry_sd_hash sourceType
        sourceType: string,
        version: string,
      },
      version: string,
    },
    version: string,
  },
};
