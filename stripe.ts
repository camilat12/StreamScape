import Stripe from "stripe"
import { supabase } from "@/lib/supabase"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY env var")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
})

// Obtener planes de Stripe desde la base de datos
export async function getStripePlans() {
  try {
    const { data: plans, error } = await supabase
      .from("plans")
      .select("*, prices(*)")
      .neq("stripe_price_id", null)
      .order("price", { ascending: true })

    if (error) {
      console.error("Error fetching plans:", error)
      return []
    }

    return (
      plans?.map((plan) => ({
        id: plan.id,
        name: plan.name,
        description: plan.description,
        price: plan.price,
        currency: plan.currency,
        interval: plan.interval,
        stripe_price_id: plan.stripe_price_id,
        features: plan.features,
      })) ?? []
    )
  } catch (error) {
    console.error("Error fetching Stripe plans:", error)
    return []
  }
}

// Crear sesión de checkout
export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string,
) {
  try {
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
      billing_address_collection: "required",
    })

    return { sessionId: session.id, url: session.url }
  } catch (error) {
    console.error("Error creating checkout session:", error)
    throw error
  }
}

// Crear o actualizar cliente de Stripe
export async function createOrUpdateCustomer(userId: string, email: string, name: string) {
  try {
    // Buscar si ya existe un cliente por metadata.userId
    const { data: customers } = await stripe.customers.list({
      email,
      limit: 1,
    })

    if (customers && customers.length > 0) {
      // Actualizar cliente existente
      const customer = await stripe.customers.update(customers[0].id, {
        metadata: {
          userId,
        },
        name,
      })
      return customer.id
    } else {
      // Crear nuevo cliente
      const customer = await stripe.customers.create({
        email,
        name,
        metadata: {
          userId,
        },
      })
      return customer.id
    }
  } catch (error) {
    console.error("Error creating/updating Stripe customer:", error)
    throw error
  }
}

// Cancelar suscripción
export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    })
    return subscription
  } catch (error) {
    console.error("Error cancelling subscription:", error)
    throw error
  }
}

// Reactivar suscripción
export async function reactivateSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    })
    return subscription
  } catch (error) {
    console.error("Error reactivating subscription:", error)
    throw error
  }
}

// Crear un portal de clientes
export async function createCustomerPortalSession(customerId: string, returnUrl: string) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    })

    return session.url
  } catch (error) {
    console.error("Error creating customer portal session:", error)
    throw error
  }
}

// Obtener detalles de suscripción de Stripe
export async function getStripeSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ["default_payment_method", "customer"],
    })
    return subscription
  } catch (error) {
    console.error("Error fetching Stripe subscription:", error)
    throw error
  }
}
