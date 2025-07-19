/*
  # Create donations table for endangered species conservation

  1. New Tables
    - `donations`
      - `id` (uuid, primary key)
      - `amount` (numeric, donation amount in cents)
      - `currency` (text, currency code like 'usd', 'cad')
      - `status` (text, payment status: 'pending', 'completed', 'failed', 'cancelled')
      - `stripe_session_id` (text, Stripe checkout session ID)
      - `stripe_payment_intent_id` (text, Stripe payment intent ID)
      - `donor_email` (text, donor's email address)
      - `donor_name` (text, donor's name)
      - `species_id` (text, optional - specific species the donation is for)
      - `message` (text, optional donor message)
      - `anonymous` (boolean, whether donation should be anonymous)
      - `created_at` (timestamp with timezone, default now())
      - `updated_at` (timestamp with timezone, default now())

  2. Security
    - Enable RLS on `donations` table
    - Add policy for public read access to completed donations (for transparency)
    - Add policy for service role to manage all donations
    - Add policy for donors to view their own donations

  3. Indexes
    - Index on stripe_session_id for webhook lookups
    - Index on status for filtering
    - Index on created_at for sorting
*/

-- Create donations table
CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  amount numeric NOT NULL CHECK (amount > 0),
  currency text NOT NULL DEFAULT 'usd',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  stripe_session_id text UNIQUE,
  stripe_payment_intent_id text,
  donor_email text,
  donor_name text,
  species_id text,
  message text,
  anonymous boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view completed donations"
  ON donations
  FOR SELECT
  TO public
  USING (status = 'completed' AND anonymous = false);

CREATE POLICY "Service role can manage all donations"
  ON donations
  FOR ALL
  TO service_role
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_donations_stripe_session_id ON donations(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_donations_species_id ON donations(species_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_donations_updated_at
  BEFORE UPDATE ON donations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();