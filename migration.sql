-- Create watches table
CREATE TABLE IF NOT EXISTS public.watches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    category TEXT NOT NULL,
    case_size TEXT,
    movement TEXT,
    band_material TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT watches_name_key UNIQUE (name)
);

-- Enable RLS for watches
ALTER TABLE public.watches ENABLE ROW LEVEL SECURITY;

-- Create policies for watches
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'watches' AND policyname = 'Allow public read access to watches'
    ) THEN
        CREATE POLICY "Allow public read access to watches" ON public.watches FOR SELECT USING (true);
    END IF;
END
$$;

-- Create wiki_terms table
CREATE TABLE IF NOT EXISTS public.wiki_terms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    term TEXT NOT NULL,
    category TEXT NOT NULL,
    definition TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT wiki_terms_term_key UNIQUE (term)
);

-- Enable RLS for wiki_terms
ALTER TABLE public.wiki_terms ENABLE ROW LEVEL SECURITY;

-- Create policies for wiki_terms
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'wiki_terms' AND policyname = 'Allow public read access to wiki_terms'
    ) THEN
        CREATE POLICY "Allow public read access to wiki_terms" ON public.wiki_terms FOR SELECT USING (true);
    END IF;
END
$$;

-- Create enquiries table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for enquiries
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for enquiries
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'enquiries' AND policyname = 'Allow public insert to enquiries'
    ) THEN
        CREATE POLICY "Allow public insert to enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);
    END IF;
END
$$;

-- Create rentals table
CREATE TABLE IF NOT EXISTS public.rentals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    watch_style TEXT NOT NULL,
    duration_days INTEGER NOT NULL,
    estimated_cost TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for rentals
ALTER TABLE public.rentals ENABLE ROW LEVEL SECURITY;

-- Create policies for rentals
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'rentals' AND policyname = 'Allow public insert to rentals'
    ) THEN
        CREATE POLICY "Allow public insert to rentals" ON public.rentals FOR INSERT WITH CHECK (true);
    END IF;
END
$$;

-- Create appraisals table
CREATE TABLE IF NOT EXISTS public.appraisals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    brand_tier TEXT NOT NULL,
    condition TEXT NOT NULL,
    estimated_value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for appraisals
ALTER TABLE public.appraisals ENABLE ROW LEVEL SECURITY;

-- Create policies for appraisals
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'appraisals' AND policyname = 'Allow public insert to appraisals'
    ) THEN
        CREATE POLICY "Allow public insert to appraisals" ON public.appraisals FOR INSERT WITH CHECK (true);
    END IF;
END
$$;

-- Create cart_items table
CREATE TABLE IF NOT EXISTS public.cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL,
    watch_id UUID REFERENCES public.watches(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for cart_items
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Create policies for cart_items
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cart_items' AND policyname = 'Allow public select on cart_items') THEN
        CREATE POLICY "Allow public select on cart_items" ON public.cart_items FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cart_items' AND policyname = 'Allow public insert on cart_items') THEN
        CREATE POLICY "Allow public insert on cart_items" ON public.cart_items FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cart_items' AND policyname = 'Allow public update on cart_items') THEN
        CREATE POLICY "Allow public update on cart_items" ON public.cart_items FOR UPDATE USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cart_items' AND policyname = 'Allow public delete on cart_items') THEN
        CREATE POLICY "Allow public delete on cart_items" ON public.cart_items FOR DELETE USING (true);
    END IF;
END
$$;

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    total_price INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies for orders
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'orders' AND policyname = 'Allow public insert to orders'
    ) THEN
        CREATE POLICY "Allow public insert to orders" ON public.orders FOR INSERT WITH CHECK (true);
    END IF;
END
$$;

-- Create order_items table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    watch_id UUID REFERENCES public.watches(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for order_items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for order_items
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'order_items' AND policyname = 'Allow public insert to order_items'
    ) THEN
        CREATE POLICY "Allow public insert to order_items" ON public.order_items FOR INSERT WITH CHECK (true);
    END IF;
END
$$;

-- Seed watches table
INSERT INTO public.watches (name, description, price, category, case_size, movement, band_material, image_url)
VALUES 
('Chrono-Tech Titanium', 'Minimalist matte titanium bezel with elegant gold indices and hybrid movement.', 18500, 'modern', '42mm Case', 'Hybrid Auto', 'Titanium Band', 'assets/modern_watch.png'),
('The Heritage Emperor', 'Roman numerals, polished gold casing, and premium alligator leather strap.', 24000, 'traditional', '40mm Case', 'Hand-Wound', 'Alligator Leather', 'assets/traditional_watch.png'),
('The Skeleton Odyssey', 'Skeleton sapphire face displaying intricate brass gears and royal blue hands.', 45500, 'unique', '44mm Case', 'Tourbillon Auto', 'Sapphire Crystal', 'assets/unique_watch.png')
ON CONFLICT (name) DO UPDATE 
SET description = EXCLUDED.description,
    price = EXCLUDED.price,
    category = EXCLUDED.category,
    case_size = EXCLUDED.case_size,
    movement = EXCLUDED.movement,
    band_material = EXCLUDED.band_material,
    image_url = EXCLUDED.image_url;

-- Seed wiki_terms table
INSERT INTO public.wiki_terms (term, category, definition)
VALUES
('Tourbillon', 'complication', 'An addition to the mechanics of a watch escapement developed around 1795 by Abraham-Louis Breguet. It mounts the escapement and balance wheel in a rotating cage, to negate the effects of gravity when the watch is stuck in a single position.'),
('Chronograph', 'complication', 'A specific watch movement featuring an integrated stopwatch mechanism. It allows the measuring of elapsed time intervals via sub-dials, typically controlled by start/stop and reset pushers on the side.'),
('Automatic winding', 'movement', 'Also called self-winding. A mechanical movement which winds its mainspring through the natural kinetic movement of the wearer''s wrist, using an internal oscillating rotor weight.'),
('Quartz caliber', 'movement', 'A highly precise timekeeping movement powered by a battery. It relies on an integrated electronic circuit and a tiny quartz crystal tuning fork vibrating at 32,768 Hz to govern the steps of the hands.'),
('GMT & Dual Time', 'complication', 'Greenwich Mean Time complication. Includes an additional independent hour hand that completes a full dial rotation in 24 hours, letting travelers monitor two or more time zones simultaneously.'),
('Refurbished (Certified)', 'services', 'A pre-owned luxury watch that undergoes multi-point inspection, ultrasonic deep-cleaning, calibration adjustments on a timegrapher, mechanical seal renewals, and timing checks by Jetha Lal''s team before listing.'),
('Escapement', 'movement', 'The core heartbeat mechanism in a mechanical watch that regulates and transfers the rotational energy from the mainspring to the balance wheel via incremental tick-tock movements.'),
('Daily Rental Service', 'services', 'A Watchable signature lounge service enabling patrons to rent authentic premium timepieces (Traditional, Modern, or Skeleton models) for events, weddings, or meetings at a daily computed rate.')
ON CONFLICT (term) DO UPDATE 
SET category = EXCLUDED.category,
    definition = EXCLUDED.definition;

-- Create encrypted_user_profiles table
CREATE TABLE IF NOT EXISTS public.encrypted_user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    encrypted_email TEXT NOT NULL,
    encrypted_name TEXT,
    encrypted_avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.encrypted_user_profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own encrypted profile
DROP POLICY IF EXISTS "Allow users to insert their own profile" ON public.encrypted_user_profiles;
CREATE POLICY "Allow users to insert their own profile" 
ON public.encrypted_user_profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Allow users to select their own encrypted profile
DROP POLICY IF EXISTS "Allow users to view their own profile" ON public.encrypted_user_profiles;
CREATE POLICY "Allow users to view their own profile" 
ON public.encrypted_user_profiles FOR SELECT 
USING (auth.uid() = id);

-- Allow users to update their own encrypted profile
DROP POLICY IF EXISTS "Allow users to update their own profile" ON public.encrypted_user_profiles;
CREATE POLICY "Allow users to update their own profile" 
ON public.encrypted_user_profiles FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
