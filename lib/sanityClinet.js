import sanityClient from '@sanity/client'

// ! sanityClient setup

export const client = sanityClient({
  projectId: 'z09x7ujb',
  dataset: 'production',
  apiVersion: 'v1',
  useCdn: false,
  token:
    'skU7kQXxFOO29GHsMoCMGVUeraAEmgsqXVd24HMFBE9a80Ehy7GGGp9X4mOAApmR4H4oGU2S4V86txE2EDdwiZV1WlN51f6nI5mS61FnoEUn0oI1UAeZDcxck1Kn481EFaGnA1WTujFIuhSiPQLkuKr10KxxAs13UMo1mbhW4eYw2ftYBhKl',
})
