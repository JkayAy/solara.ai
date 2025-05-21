import { SignUpButton } from '@clerk/nextjs';
import { Check } from 'lucide-react';

export function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      description: 'Perfect for individuals and small teams',
      features: [
        'AI Command Center',
        'Email Management',
        'Basic Analytics',
        '5GB Storage',
        'Email Support'
      ]
    },
    {
      name: 'Pro',
      price: '$79',
      description: 'Ideal for growing businesses',
      features: [
        'Everything in Starter',
        'Advanced Analytics',
        'Workflow Automation',
        '50GB Storage',
        'Priority Support',
        'Team Collaboration'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: [
        'Everything in Pro',
        'Custom Integrations',
        'Unlimited Storage',
        'Dedicated Support',
        'SLA Guarantee',
        'Custom Features'
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that best fits your needs. All plans include a 14-day free trial.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg border p-8 ${plan.popular ? 'border-primary shadow-lg' : ''
                }`}
            >
              {plan.popular && (
                <div className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold mb-4">{plan.price}</div>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="w-5 h-5 text-primary mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <SignUpButton mode="modal" afterSignUpUrl="/dashboard">
                <button
                  className={`w-full py-2 px-4 rounded-lg ${plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'border hover:bg-muted'
                    } transition-colors`}
                >
                  Get Started
                </button>
              </SignUpButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 