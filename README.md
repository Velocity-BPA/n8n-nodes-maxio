# n8n-nodes-maxio

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for Maxio (formerly Chargify), a B2B subscription billing and revenue management platform. This node enables workflow automation for subscription lifecycle management, usage-based billing, component pricing, invoice operations, and customer account management.

![n8n](https://img.shields.io/badge/n8n-community%20node-orange)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)

## Features

- **12 Resources** with comprehensive operations covering all major Maxio functionality
- **80+ Operations** for complete subscription billing automation
- **Webhook Triggers** for 30+ event types to build reactive workflows
- **Full TypeScript Support** with complete type definitions
- **Pagination Support** for efficient handling of large datasets
- **Error Handling** with detailed error messages and retry logic

## Installation

### Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings** > **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-maxio`
5. Click **Install**

### Manual Installation

```bash
# Navigate to your n8n installation directory
cd ~/.n8n

# Install the package
npm install n8n-nodes-maxio
```

### Development Installation

```bash
# Clone the repository
git clone https://github.com/Velocity-BPA/n8n-nodes-maxio.git
cd n8n-nodes-maxio

# Install dependencies
npm install

# Build the project
npm run build

# Link to n8n
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-maxio

# Restart n8n
```

## Credentials Setup

To use this node, you need Maxio API credentials:

| Field | Description |
|-------|-------------|
| **API Key** | Your Maxio API key from Config > Integrations > API Access |
| **Subdomain** | Your Maxio subdomain (e.g., `yourcompany` from `yourcompany.chargify.com`) |

### Getting Your API Key

1. Log in to your Maxio/Chargify account
2. Navigate to **Config** > **Integrations** > **API Access**
3. Copy your API Key
4. Note your subdomain from the URL

## Resources & Operations

### Subscription (20 operations)
- `get` - Get subscription by ID
- `getAll` - List all subscriptions with filters
- `create` - Create a new subscription
- `update` - Update subscription details
- `cancel` - Cancel subscription (immediate or delayed)
- `reactivate` - Reactivate canceled subscription
- `resetBalance` - Reset subscription balance
- `updateProduct` - Change subscription product
- `updatePaymentProfile` - Change payment method
- `previewRenewal` - Preview next renewal
- `previewMigration` - Preview product migration
- `addCoupon` - Apply coupon to subscription
- `removeCoupon` - Remove coupon from subscription
- `getPrepayments` - Get prepayment balance
- `createPrepayment` - Add prepayment
- `refundPrepayment` - Refund prepayment
- `getEvents` - Get subscription events
- `getMetadata` - Get subscription metadata
- `setMetadata` - Set subscription metadata
- `override` - Admin override subscription settings

### Customer (9 operations)
- `create` - Create a new customer
- `get` - Get customer by ID
- `getAll` - List all customers
- `update` - Update customer details
- `delete` - Delete a customer
- `getSubscriptions` - Get customer subscriptions
- `getPaymentProfiles` - Get payment profiles
- `getMetadata` - Get customer metadata
- `setMetadata` - Set customer metadata

### Product (6 operations)
- `get` - Get product by ID or handle
- `getAll` - List all products
- `create` - Create a new product
- `update` - Update product details
- `archive` - Archive a product
- `getComponents` - Get product components

### Component (13 operations)
- `get` - Get component by ID
- `getAll` - List all components for product family
- `create` - Create a new component
- `update` - Update component
- `archive` - Archive a component
- `getAllocations` - Get component allocations
- `createAllocation` - Create/update allocation
- `getAllPricePoints` - Get pricing tiers
- `createPricePoint` - Create price point
- `updatePricePoint` - Update price point
- `archivePricePoint` - Archive price point
- `listUsages` - List usage records
- `createUsage` - Record usage

### Invoice (13 operations)
- `get` - Get invoice by ID or UID
- `getAll` - List all invoices
- `create` - Create ad-hoc invoice
- `void` - Void an invoice
- `refund` - Refund an invoice
- `issueAdvanceInvoice` - Issue invoice in advance
- `recordPayment` - Record external payment
- `applyPayment` - Apply payment to invoice
- `applyCredit` - Apply credit note
- `sendEmail` - Send invoice email
- `getEvents` - Get invoice events
- `getLineItems` - Get line item details
- `getCreditNotes` - Get related credit notes

### Payment Profile (6 operations)
- `get` - Get payment profile by ID
- `getAll` - List payment profiles for customer
- `create` - Create payment profile
- `update` - Update payment profile
- `delete` - Delete payment profile
- `setDefault` - Set as default payment method

### Coupon (9 operations)
- `get` - Get coupon by ID or code
- `getAll` - List all coupons
- `create` - Create a new coupon
- `update` - Update coupon details
- `archive` - Archive a coupon
- `getSubcodes` - Get subcodes for coupon
- `createSubcodes` - Generate subcodes
- `deleteSubcode` - Delete a subcode
- `getUsages` - Get coupon usage

### Product Family (7 operations)
- `get` - Get product family by ID
- `getAll` - List all product families
- `create` - Create product family
- `update` - Update product family
- `getProducts` - Get products in family
- `getComponents` - Get components in family
- `getCoupons` - Get coupons in family

### Statement (3 operations)
- `get` - Get statement by ID
- `getAll` - List statements for subscription
- `getIds` - Get statement IDs in date range

### Transaction (4 operations)
- `get` - Get transaction by ID
- `getAll` - List all transactions
- `refund` - Refund a transaction
- `void` - Void a transaction

### Webhook (7 operations)
- `getEndpoints` - List webhook endpoints
- `createEndpoint` - Create endpoint
- `updateEndpoint` - Update endpoint
- `deleteEndpoint` - Delete endpoint
- `enableWebhooks` - Enable webhooks
- `replayWebhooks` - Replay failed webhooks
- `listWebhooks` - List recent webhooks

### Site (3 operations)
- `get` - Get site details
- `clearData` - Clear test/sandbox data
- `getStats` - Get site statistics

## Trigger Node

The **Maxio Trigger** node allows you to start workflows based on Maxio events via webhooks.

### Supported Events

| Event | Description |
|-------|-------------|
| `signup_success` | New subscription created successfully |
| `signup_failure` | Subscription creation failed |
| `payment_success` | Payment completed successfully |
| `payment_failure` | Payment failed |
| `renewal_success` | Subscription renewed successfully |
| `renewal_failure` | Subscription renewal failed |
| `subscription_state_change` | Subscription state changed |
| `subscription_product_change` | Product changed on subscription |
| `subscription_card_update` | Payment card updated |
| `invoice_issued` | New invoice issued |
| `customer_create` | New customer created |
| `customer_update` | Customer updated |
| `customer_delete` | Customer deleted |
| `component_allocation_change` | Component allocation modified |
| `metered_usage` | Usage recorded |
| `refund_success` | Refund completed |
| `refund_failure` | Refund failed |
| `dunning_step_reached` | Dunning milestone reached |
| `expiring_card` | Card expiring soon |
| `statement_closed` | Statement closed |
| `statement_settled` | Statement settled |
| `upgrade_downgrade_success` | Migration succeeded |
| `upgrade_downgrade_failure` | Migration failed |
| `upcoming_renewal_notice` | Renewal approaching |
| And more... | |

## Usage Examples

### Create a Customer and Subscription

```json
{
  "nodes": [
    {
      "name": "Create Customer",
      "type": "n8n-nodes-maxio.maxio",
      "parameters": {
        "resource": "customer",
        "operation": "create",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "organization": "Acme Corp"
      }
    },
    {
      "name": "Create Subscription",
      "type": "n8n-nodes-maxio.maxio",
      "parameters": {
        "resource": "subscription",
        "operation": "create",
        "customerId": "={{ $json.customer.id }}",
        "productHandle": "basic-plan"
      }
    }
  ]
}
```

### Handle Payment Failures

Use the Maxio Trigger node to listen for `payment_failure` events and send notifications or take corrective action.

### Record Metered Usage

```json
{
  "name": "Record Usage",
  "type": "n8n-nodes-maxio.maxio",
  "parameters": {
    "resource": "component",
    "operation": "createUsage",
    "subscriptionId": 12345,
    "componentId": 67890,
    "quantity": 100,
    "memo": "API calls for January 2024"
  }
}
```

## Maxio Concepts

### Subscriptions
Subscriptions represent the billing relationship between a customer and a product. They track the customer's payment status, billing dates, and any applied coupons or components.

### Components
Components are add-ons or usage-based items that can be attached to subscriptions. Types include:
- **Quantity-based**: Fixed quantity per billing period
- **Metered**: Usage recorded and billed at period end
- **On/Off**: Binary feature flags
- **Prepaid**: Pre-purchased usage credits

### Product Families
Product families group related products and components together, making it easier to manage pricing and offerings.

### Invoices
Invoices are billing documents generated for subscriptions. They can be automatic (from renewals) or ad-hoc (manually created).

## Error Handling

The node handles common Maxio API errors:

| Status Code | Description |
|-------------|-------------|
| 401 | Invalid API credentials |
| 403 | Access denied |
| 404 | Resource not found |
| 422 | Validation error |
| 429 | Rate limit exceeded (automatic retry) |
| 500 | Server error |

The node implements automatic retry with exponential backoff for rate limiting (429) and server errors (5xx).

## Security Best Practices

1. **Store credentials securely** - Use n8n's credential system
2. **Use test environments** - Test workflows in sandbox before production
3. **Limit API access** - Use read-only keys when possible
4. **Monitor webhook endpoints** - Regularly audit webhook configurations
5. **Validate webhook signatures** - The trigger node automatically verifies signatures

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run linting
npm run lint

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Watch mode for development
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service,
or paid automation offering requires a commercial license.

For licensing inquiries:
**licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please ensure your code follows the existing style and includes tests.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-maxio/issues)
- **Documentation**: [Maxio API Docs](https://developers.maxio.com)
- **n8n Community**: [n8n Community Forum](https://community.n8n.io)

## Acknowledgments

- [Maxio](https://www.maxio.com) for providing comprehensive API documentation
- [n8n](https://n8n.io) for the workflow automation platform
- The n8n community for feedback and contributions
