// Store config. The ONLY file you edit to go live.
// 1. Stripe Dashboard > Payment Links > create one link per pack (test mode first).
// 2. Paste each https://buy.stripe.com/... URL into `link` below.
// 3. Make each price here match the Price on its Payment Link.
// Publishable links only. Never put a Stripe secret key or restricted key in this repo.
window.REDMED_STORE = {
  tiers: [
    { id: 'solo',   name: 'Single Band',  bands: 1, price: 40, blurb: 'One blank NTAG216 band.',              link: '' },
    { id: 'pair',   name: 'Pair',         bands: 2, price: 65, blurb: 'Two bands. Wear one, keep a spare.',   link: '', badge: 'Most popular' },
    { id: 'family', name: 'Family Pack',  bands: 3, price: 70, blurb: 'Three bands for the household.',      link: '' }
  ],
  currency: 'USD',
  supportEmail: 'Admin@RedMed.live'
};
