

async function createCheckoutSession(req, res) {
  const domainUrl = process.env.ORIGIN || "http://localhost:3000"
//   update this to URL after deployment
  const { line_items } = req.body;
  // check req body has line items and email
  if (!line_items) {
    return res
      .status(400)
      .json({ error: "missing required session parameters" });
  }

  let session;

  try {
    session = await session.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      
      success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainUrl}/cancel`,
      shipping_address_collection: { allowed_countries: ["GB", "US"] },
    });
    res.status(200).json({ sessionId: session.id})
  } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'an error occurred, unable to create session'})
  }
}

module.exports = createCheckoutSession;