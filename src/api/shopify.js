const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN
const STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_ACCESS_TOKEN
const API_VERSION = '2024-01'

const endpoint = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`

async function shopifyFetch(query, variables = {}) {
  if (!SHOPIFY_DOMAIN || !STOREFRONT_ACCESS_TOKEN) {
    return { data: null, error: 'Shopify credentials not configured in .env' }
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!res.ok) {
    return { data: null, error: `HTTP ${res.status}: ${res.statusText}` }
  }

  const json = await res.json()
  return { data: json.data, error: json.errors }
}

const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`

const PRODUCT_QUERY = `
  query Product($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      availableForSale
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 1) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`

const CART_CREATE_MUTATION = `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        checkoutUrl
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`

export async function getProducts(first = 12) {
  return shopifyFetch(PRODUCTS_QUERY, { first })
}

export async function getProduct(handle) {
  return shopifyFetch(PRODUCT_QUERY, { handle })
}

const RETURN_URL = 'https://isza-ceramics.onrender.com/collection'

export async function createCart(lines) {
  return shopifyFetch(CART_CREATE_MUTATION, {
    input: { lines, returnUrl: RETURN_URL },
  })
}
