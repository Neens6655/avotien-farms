-- Avotien Admin CRM — Seed Data
-- Run after 001_initial_schema.sql

-- ============================================
-- 1 ADMIN USER
-- ============================================
INSERT INTO admin_users (id, clerk_id, email, full_name, role, permissions) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'clerk_admin_001', 'ziad@avotien.com', 'Ziad Mukheimer', 'super_admin', '["all"]'::jsonb);

-- ============================================
-- 1 PROJECT (Mukono Farm)
-- ============================================
INSERT INTO projects (id, slug, name, location, country, coordinates, total_trees, sold_trees, tree_variety, altitude, rainfall, soil_type, status, planting_date, first_harvest_date, description) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'mukono-farm', 'Mukono Hass Avocado Farm', 'Mukono District', 'Uganda',
   '{"lat": 0.3536, "lng": 32.7554}'::jsonb, 200, 100, 'Hass', '1200m', '1200mm/year', 'Red laterite',
   'active', '2024-03-15', '2027-06-01',
   'Premium Hass avocado plantation in Mukono District, Central Uganda. Rich volcanic soil, consistent rainfall, ideal altitude for export-grade fruit.');

-- ============================================
-- 50 INVESTORS
-- ============================================
INSERT INTO investors (id, clerk_id, email, full_name, phone, country, kyc_status, plan) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'clerk_inv_001', 'ahmed.khalifa@gmail.com', 'Ahmed Al Khalifa', '+971501234567', 'UAE', 'approved', 'premium_10'),
  ('c0000000-0000-0000-0000-000000000002', 'clerk_inv_002', 'sarah.johnson@outlook.com', 'Sarah Johnson', '+447700123456', 'UK', 'approved', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000003', 'clerk_inv_003', 'mohammed.ali@yahoo.com', 'Mohammed Ali Hassan', '+966551234567', 'Saudi Arabia', 'approved', 'premium_10'),
  ('c0000000-0000-0000-0000-000000000004', 'clerk_inv_004', 'elena.petrova@mail.ru', 'Elena Petrova', '+79161234567', 'Russia', 'submitted', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000005', 'clerk_inv_005', 'james.oconnor@gmail.com', 'James O''Connor', '+353871234567', 'Ireland', 'approved', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000006', 'clerk_inv_006', 'fatima.zahra@hotmail.com', 'Fatima Zahra', '+212661234567', 'Morocco', 'approved', 'premium_10'),
  ('c0000000-0000-0000-0000-000000000007', 'clerk_inv_007', 'hans.mueller@web.de', 'Hans Mueller', '+491511234567', 'Germany', 'approved', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000008', 'clerk_inv_008', 'priya.sharma@gmail.com', 'Priya Sharma', '+919876543210', 'India', 'pending', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000009', 'clerk_inv_009', 'omar.hassan@gmail.com', 'Omar Hassan', '+201001234567', 'Egypt', 'approved', 'premium_10'),
  ('c0000000-0000-0000-0000-000000000010', 'clerk_inv_010', 'maria.garcia@gmail.com', 'Maria Garcia Lopez', '+34611234567', 'Spain', 'approved', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000011', 'clerk_inv_011', 'chen.wei@qq.com', 'Chen Wei', '+8613812345678', 'China', 'submitted', 'premium_10'),
  ('c0000000-0000-0000-0000-000000000012', 'clerk_inv_012', 'anna.berg@gmail.com', 'Anna Bergström', '+46701234567', 'Sweden', 'approved', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000013', 'clerk_inv_013', 'khalid.mansour@gmail.com', 'Khalid Al Mansour', '+971551234567', 'UAE', 'approved', 'elite_25'),
  ('c0000000-0000-0000-0000-000000000014', 'clerk_inv_014', 'sophie.dubois@gmail.com', 'Sophie Dubois', '+33612345678', 'France', 'approved', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000015', 'clerk_inv_015', 'david.kim@gmail.com', 'David Kim', '+821012345678', 'South Korea', 'pending', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000016', 'clerk_inv_016', 'rashid.al.maktoum@gmail.com', 'Rashid Al Maktoum', '+971561234567', 'UAE', 'approved', 'elite_25'),
  ('c0000000-0000-0000-0000-000000000017', 'clerk_inv_017', 'lisa.anderson@gmail.com', 'Lisa Anderson', '+12125551234', 'USA', 'approved', 'premium_10'),
  ('c0000000-0000-0000-0000-000000000018', 'clerk_inv_018', 'yuki.tanaka@gmail.com', 'Yuki Tanaka', '+819012345678', 'Japan', 'approved', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000019', 'clerk_inv_019', 'nabil.haddad@gmail.com', 'Nabil Haddad', '+9611234567', 'Lebanon', 'approved', 'premium_10'),
  ('c0000000-0000-0000-0000-000000000020', 'clerk_inv_020', 'emma.wilson@gmail.com', 'Emma Wilson', '+61412345678', 'Australia', 'approved', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000021', 'clerk_inv_021', 'ali.reza@gmail.com', 'Ali Reza Mohammadi', '+989121234567', 'Iran', 'submitted', 'premium_10'),
  ('c0000000-0000-0000-0000-000000000022', 'clerk_inv_022', 'claudia.rossi@gmail.com', 'Claudia Rossi', '+393331234567', 'Italy', 'approved', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000023', 'clerk_inv_023', 'peter.vanderberg@gmail.com', 'Peter van der Berg', '+31612345678', 'Netherlands', 'approved', 'premium_10'),
  ('c0000000-0000-0000-0000-000000000024', 'clerk_inv_024', 'amina.diop@gmail.com', 'Amina Diop', '+221771234567', 'Senegal', 'approved', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000025', 'clerk_inv_025', 'robert.smith@gmail.com', 'Robert Smith', '+14165551234', 'Canada', 'approved', 'premium_10'),
  ('c0000000-0000-0000-0000-000000000026', 'clerk_inv_026', 'noura.al.thani@gmail.com', 'Noura Al Thani', '+97433123456', 'Qatar', 'approved', 'elite_25'),
  ('c0000000-0000-0000-0000-000000000027', 'clerk_inv_027', 'jan.kowalski@gmail.com', 'Jan Kowalski', '+48501234567', 'Poland', 'pending', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000028', 'clerk_inv_028', 'aisha.mohammed@gmail.com', 'Aisha Mohammed', '+254712345678', 'Kenya', 'approved', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000029', 'clerk_inv_029', 'michael.brown@gmail.com', 'Michael Brown', '+442071234567', 'UK', 'approved', 'premium_10'),
  ('c0000000-0000-0000-0000-000000000030', 'clerk_inv_030', 'lucia.martinez@gmail.com', 'Lucia Martinez', '+5491112345678', 'Argentina', 'approved', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000031', 'clerk_inv_031', 'hassan.ibrahim@gmail.com', 'Hassan Ibrahim', '+971521234567', 'UAE', 'approved', 'premium_10'),
  ('c0000000-0000-0000-0000-000000000032', 'clerk_inv_032', 'katarina.novak@gmail.com', 'Katarina Novak', '+385911234567', 'Croatia', 'submitted', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000033', 'clerk_inv_033', 'tariq.bin.saeed@gmail.com', 'Tariq Bin Saeed', '+966541234567', 'Saudi Arabia', 'approved', 'elite_25'),
  ('c0000000-0000-0000-0000-000000000034', 'clerk_inv_034', 'jessica.lee@gmail.com', 'Jessica Lee', '+6591234567', 'Singapore', 'approved', 'premium_10'),
  ('c0000000-0000-0000-0000-000000000035', 'clerk_inv_035', 'paulo.santos@gmail.com', 'Paulo Santos', '+5511912345678', 'Brazil', 'approved', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000036', 'clerk_inv_036', 'victoria.chen@gmail.com', 'Victoria Chen', '+85291234567', 'Hong Kong', 'approved', 'premium_10'),
  ('c0000000-0000-0000-0000-000000000037', 'clerk_inv_037', 'anders.nielsen@gmail.com', 'Anders Nielsen', '+4520123456', 'Denmark', 'approved', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000038', 'clerk_inv_038', 'salma.benali@gmail.com', 'Salma Benali', '+21321234567', 'Algeria', 'pending', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000039', 'clerk_inv_039', 'thomas.wright@gmail.com', 'Thomas Wright', '+61421234567', 'Australia', 'approved', 'premium_10'),
  ('c0000000-0000-0000-0000-000000000040', 'clerk_inv_040', 'mei.lin@gmail.com', 'Mei Lin', '+60121234567', 'Malaysia', 'approved', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000041', 'clerk_inv_041', 'abdullah.qatar@gmail.com', 'Abdullah Al Qatari', '+97155987654', 'UAE', 'approved', 'premium_10'),
  ('c0000000-0000-0000-0000-000000000042', 'clerk_inv_042', 'ingrid.larsen@gmail.com', 'Ingrid Larsen', '+4791234567', 'Norway', 'approved', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000043', 'clerk_inv_043', 'george.papadopoulos@gmail.com', 'George Papadopoulos', '+306912345678', 'Greece', 'approved', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000044', 'clerk_inv_044', 'layla.alfarsi@gmail.com', 'Layla Al Farsi', '+96891234567', 'Oman', 'approved', 'premium_10'),
  ('c0000000-0000-0000-0000-000000000045', 'clerk_inv_045', 'daniel.murphy@gmail.com', 'Daniel Murphy', '+353851234567', 'Ireland', 'rejected', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000046', 'clerk_inv_046', 'nina.ivanova@gmail.com', 'Nina Ivanova', '+380501234567', 'Ukraine', 'approved', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000047', 'clerk_inv_047', 'ricardo.oliveira@gmail.com', 'Ricardo Oliveira', '+351911234567', 'Portugal', 'approved', 'premium_10'),
  ('c0000000-0000-0000-0000-000000000048', 'clerk_inv_048', 'samira.khan@gmail.com', 'Samira Khan', '+923001234567', 'Pakistan', 'submitted', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000049', 'clerk_inv_049', 'erik.johansson@gmail.com', 'Erik Johansson', '+46731234567', 'Sweden', 'approved', 'starter_5'),
  ('c0000000-0000-0000-0000-000000000050', 'clerk_inv_050', 'mariam.alsayed@gmail.com', 'Mariam Al Sayed', '+97336123456', 'Bahrain', 'approved', 'premium_10');

-- ============================================
-- 200 TREES (100 assigned, 100 available)
-- ============================================
-- Assigned trees (to first 20 investors, 5 each)
DO $$
DECLARE
  inv_id UUID;
  inv_idx INT;
  tree_idx INT;
  tree_num INT := 1;
BEGIN
  -- 100 assigned trees: investors 1-20, 5 trees each
  FOR inv_idx IN 1..20 LOOP
    inv_id := ('c0000000-0000-0000-0000-' || LPAD(inv_idx::TEXT, 12, '0'))::UUID;
    FOR tree_idx IN 1..5 LOOP
      INSERT INTO trees (tree_code, project_id, investor_id, gps_lat, gps_lng, block, row_num, variety, status, health_score, planted_at, assigned_at)
      VALUES (
        'MKN-' || LPAD(tree_num::TEXT, 4, '0'),
        'b0000000-0000-0000-0000-000000000001',
        inv_id,
        0.3536 + (random() * 0.005 - 0.0025),
        32.7554 + (random() * 0.005 - 0.0025),
        'B' || ((tree_num - 1) / 25 + 1),
        ((tree_num - 1) % 25) + 1,
        'Hass',
        CASE WHEN tree_num <= 40 THEN 'growing' ELSE 'assigned' END,
        (6 + floor(random() * 5))::INT,
        '2024-03-15',
        '2025-01-' || LPAD((1 + (inv_idx % 28))::TEXT, 2, '0') || ' 10:00:00+00'
      );
      tree_num := tree_num + 1;
    END LOOP;
  END LOOP;

  -- 100 available trees
  FOR tree_idx IN 101..200 LOOP
    INSERT INTO trees (tree_code, project_id, gps_lat, gps_lng, block, row_num, variety, status, health_score, planted_at)
    VALUES (
      'MKN-' || LPAD(tree_idx::TEXT, 4, '0'),
      'b0000000-0000-0000-0000-000000000001',
      0.3536 + (random() * 0.005 - 0.0025),
      32.7554 + (random() * 0.005 - 0.0025),
      'B' || ((tree_idx - 1) / 25 + 1),
      ((tree_idx - 1) % 25) + 1,
      'Hass',
      'available',
      (5 + floor(random() * 4))::INT,
      '2024-03-15'
    );
  END LOOP;
END $$;

-- ============================================
-- 30 PURCHASES
-- ============================================
INSERT INTO purchases (investor_id, plan_id, trees_count, amount_usd, stripe_session_id, stripe_payment_intent, status, created_at) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'premium_10', 10, 4500.00, 'cs_live_a1b2c3d4', 'pi_a1b2c3d4', 'completed', '2025-01-05 09:30:00+00'),
  ('c0000000-0000-0000-0000-000000000002', 'starter_5', 5, 2250.00, 'cs_live_e5f6g7h8', 'pi_e5f6g7h8', 'completed', '2025-01-07 14:15:00+00'),
  ('c0000000-0000-0000-0000-000000000003', 'premium_10', 10, 4500.00, 'cs_live_i9j0k1l2', 'pi_i9j0k1l2', 'completed', '2025-01-10 11:00:00+00'),
  ('c0000000-0000-0000-0000-000000000005', 'starter_5', 5, 2250.00, 'cs_live_m3n4o5p6', 'pi_m3n4o5p6', 'completed', '2025-01-12 16:45:00+00'),
  ('c0000000-0000-0000-0000-000000000006', 'premium_10', 10, 4500.00, 'cs_live_q7r8s9t0', 'pi_q7r8s9t0', 'completed', '2025-01-15 08:20:00+00'),
  ('c0000000-0000-0000-0000-000000000007', 'starter_5', 5, 2250.00, 'cs_live_u1v2w3x4', 'pi_u1v2w3x4', 'completed', '2025-01-18 13:30:00+00'),
  ('c0000000-0000-0000-0000-000000000009', 'premium_10', 10, 4500.00, 'cs_live_y5z6a7b8', 'pi_y5z6a7b8', 'completed', '2025-01-20 10:00:00+00'),
  ('c0000000-0000-0000-0000-000000000010', 'starter_5', 5, 2250.00, 'cs_live_c9d0e1f2', 'pi_c9d0e1f2', 'completed', '2025-01-22 15:10:00+00'),
  ('c0000000-0000-0000-0000-000000000012', 'starter_5', 5, 2250.00, 'cs_live_g3h4i5j6', 'pi_g3h4i5j6', 'completed', '2025-01-25 09:45:00+00'),
  ('c0000000-0000-0000-0000-000000000013', 'elite_25', 25, 10000.00, 'cs_live_k7l8m9n0', 'pi_k7l8m9n0', 'completed', '2025-02-01 11:30:00+00'),
  ('c0000000-0000-0000-0000-000000000014', 'starter_5', 5, 2250.00, 'cs_live_o1p2q3r4', 'pi_o1p2q3r4', 'completed', '2025-02-03 14:00:00+00'),
  ('c0000000-0000-0000-0000-000000000016', 'elite_25', 25, 10000.00, 'cs_live_s5t6u7v8', 'pi_s5t6u7v8', 'completed', '2025-02-05 10:20:00+00'),
  ('c0000000-0000-0000-0000-000000000017', 'premium_10', 10, 4500.00, 'cs_live_w9x0y1z2', 'pi_w9x0y1z2', 'completed', '2025-02-08 16:00:00+00'),
  ('c0000000-0000-0000-0000-000000000018', 'starter_5', 5, 2250.00, 'cs_live_a3b4c5d6', 'pi_a3b4c5d6', 'completed', '2025-02-10 08:45:00+00'),
  ('c0000000-0000-0000-0000-000000000019', 'premium_10', 10, 4500.00, 'cs_live_e7f8g9h0', 'pi_e7f8g9h0', 'completed', '2025-02-12 12:30:00+00'),
  ('c0000000-0000-0000-0000-000000000020', 'starter_5', 5, 2250.00, 'cs_live_i1j2k3l4', 'pi_i1j2k3l4', 'completed', '2025-02-15 09:15:00+00'),
  ('c0000000-0000-0000-0000-000000000023', 'premium_10', 10, 4500.00, 'cs_live_m5n6o7p8', 'pi_m5n6o7p8', 'completed', '2025-02-18 14:45:00+00'),
  ('c0000000-0000-0000-0000-000000000025', 'premium_10', 10, 4500.00, 'cs_live_q9r0s1t2', 'pi_q9r0s1t2', 'completed', '2025-02-20 11:00:00+00'),
  ('c0000000-0000-0000-0000-000000000026', 'elite_25', 25, 10000.00, 'cs_live_u3v4w5x6', 'pi_u3v4w5x6', 'completed', '2025-02-22 16:30:00+00'),
  ('c0000000-0000-0000-0000-000000000029', 'premium_10', 10, 4500.00, 'cs_live_y7z8a9b0', 'pi_y7z8a9b0', 'completed', '2025-02-25 10:15:00+00'),
  ('c0000000-0000-0000-0000-000000000031', 'premium_10', 10, 4500.00, 'cs_live_c1d2e3f4', 'pi_c1d2e3f4', 'completed', '2025-03-01 13:00:00+00'),
  ('c0000000-0000-0000-0000-000000000033', 'elite_25', 25, 10000.00, 'cs_live_g5h6i7j8', 'pi_g5h6i7j8', 'completed', '2025-03-03 09:30:00+00'),
  ('c0000000-0000-0000-0000-000000000034', 'premium_10', 10, 4500.00, 'cs_live_k9l0m1n2', 'pi_k9l0m1n2', 'completed', '2025-03-05 15:45:00+00'),
  ('c0000000-0000-0000-0000-000000000036', 'premium_10', 10, 4500.00, 'cs_live_o3p4q5r6', 'pi_o3p4q5r6', 'completed', '2025-03-07 08:00:00+00'),
  ('c0000000-0000-0000-0000-000000000039', 'premium_10', 10, 4500.00, 'cs_live_s7t8u9v0', 'pi_s7t8u9v0', 'completed', '2025-03-10 12:20:00+00'),
  ('c0000000-0000-0000-0000-000000000041', 'premium_10', 10, 4500.00, 'cs_live_w1x2y3z4', 'pi_w1x2y3z4', 'completed', '2025-03-12 14:30:00+00'),
  ('c0000000-0000-0000-0000-000000000044', 'premium_10', 10, 4500.00, 'cs_live_a5b6c7d8', 'pi_a5b6c7d8', 'completed', '2025-03-14 10:45:00+00'),
  ('c0000000-0000-0000-0000-000000000047', 'premium_10', 10, 4500.00, 'cs_live_e9f0g1h2', 'pi_e9f0g1h2', 'completed', '2025-03-16 16:15:00+00'),
  ('c0000000-0000-0000-0000-000000000050', 'premium_10', 10, 4500.00, 'cs_live_i3j4k5l6', 'pi_i3j4k5l6', 'completed', '2025-03-18 09:00:00+00'),
  ('c0000000-0000-0000-0000-000000000008', 'starter_5', 5, 2250.00, 'cs_live_m7n8o9p0', 'pi_m7n8o9p0', 'pending', '2025-03-20 11:30:00+00');

-- ============================================
-- 20 PAYOUTS (first harvest season)
-- ============================================
INSERT INTO payouts (investor_id, harvest_season, trees_count, yield_per_tree_kg, price_per_kg_usd, amount_usd, status, calculated_at, approved_at, paid_at, notes) VALUES
  ('c0000000-0000-0000-0000-000000000001', '2025-Q4', 5, 45.00, 2.80, 630.00, 'reconciled', '2025-11-01', '2025-11-05', '2025-11-15', 'First harvest payout'),
  ('c0000000-0000-0000-0000-000000000002', '2025-Q4', 5, 42.00, 2.80, 588.00, 'reconciled', '2025-11-01', '2025-11-05', '2025-11-15', NULL),
  ('c0000000-0000-0000-0000-000000000003', '2025-Q4', 5, 48.00, 2.80, 672.00, 'confirmed', '2025-11-01', '2025-11-05', '2025-11-18', NULL),
  ('c0000000-0000-0000-0000-000000000005', '2025-Q4', 5, 44.00, 2.80, 616.00, 'confirmed', '2025-11-01', '2025-11-05', '2025-11-18', NULL),
  ('c0000000-0000-0000-0000-000000000006', '2025-Q4', 5, 46.00, 2.80, 644.00, 'sent', '2025-11-01', '2025-11-05', NULL, NULL),
  ('c0000000-0000-0000-0000-000000000007', '2025-Q4', 5, 41.00, 2.80, 574.00, 'sent', '2025-11-01', '2025-11-05', NULL, NULL),
  ('c0000000-0000-0000-0000-000000000009', '2025-Q4', 5, 47.00, 2.80, 658.00, 'sent', '2025-11-01', '2025-11-05', NULL, NULL),
  ('c0000000-0000-0000-0000-000000000010', '2025-Q4', 5, 43.00, 2.80, 602.00, 'approved', '2025-11-01', '2025-11-10', NULL, NULL),
  ('c0000000-0000-0000-0000-000000000012', '2025-Q4', 5, 40.00, 2.80, 560.00, 'approved', '2025-11-01', '2025-11-10', NULL, NULL),
  ('c0000000-0000-0000-0000-000000000013', '2025-Q4', 5, 49.00, 2.80, 686.00, 'approved', '2025-11-01', '2025-11-10', NULL, NULL),
  ('c0000000-0000-0000-0000-000000000014', '2025-Q4', 5, 44.00, 2.80, 616.00, 'calculated', '2025-11-01', NULL, NULL, NULL),
  ('c0000000-0000-0000-0000-000000000016', '2025-Q4', 5, 46.00, 2.80, 644.00, 'calculated', '2025-11-01', NULL, NULL, NULL),
  ('c0000000-0000-0000-0000-000000000017', '2025-Q4', 5, 45.00, 2.80, 630.00, 'calculated', '2025-11-01', NULL, NULL, NULL),
  ('c0000000-0000-0000-0000-000000000018', '2025-Q4', 5, 42.00, 2.80, 588.00, 'calculated', '2025-11-01', NULL, NULL, NULL),
  ('c0000000-0000-0000-0000-000000000019', '2025-Q4', 5, 47.00, 2.80, 658.00, 'calculated', '2025-11-01', NULL, NULL, NULL),
  ('c0000000-0000-0000-0000-000000000001', '2026-Q1', 5, 52.00, 3.10, 806.00, 'calculated', '2026-02-15', NULL, NULL, 'Second season — higher yield'),
  ('c0000000-0000-0000-0000-000000000002', '2026-Q1', 5, 50.00, 3.10, 775.00, 'calculated', '2026-02-15', NULL, NULL, NULL),
  ('c0000000-0000-0000-0000-000000000003', '2026-Q1', 5, 55.00, 3.10, 852.50, 'calculated', '2026-02-15', NULL, NULL, NULL),
  ('c0000000-0000-0000-0000-000000000005', '2026-Q1', 5, 48.00, 3.10, 744.00, 'calculated', '2026-02-15', NULL, NULL, NULL),
  ('c0000000-0000-0000-0000-000000000006', '2026-Q1', 5, 53.00, 3.10, 821.50, 'calculated', '2026-02-15', NULL, NULL, NULL);

-- ============================================
-- 10 CROP REPORTS
-- ============================================
INSERT INTO crop_reports (project_id, block, report_date, yield_kg, health_score, weather_notes, pest_notes, notes, created_by) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'B1', '2025-04-15', NULL, 7, 'Good rainfall, 120mm this month', 'Minor aphid presence — treated with neem oil', 'Trees establishing well, strong root development', 'a0000000-0000-0000-0000-000000000001'),
  ('b0000000-0000-0000-0000-000000000001', 'B2', '2025-04-15', NULL, 8, 'Good rainfall, 120mm this month', 'No pest issues detected', 'Excellent growth in Block B2', 'a0000000-0000-0000-0000-000000000001'),
  ('b0000000-0000-0000-0000-000000000001', 'B1', '2025-07-20', NULL, 8, 'Dry season — irrigation supplementing', 'Fruit fly traps deployed', 'First flowering observed in mature trees', 'a0000000-0000-0000-0000-000000000001'),
  ('b0000000-0000-0000-0000-000000000001', 'B2', '2025-07-20', NULL, 7, 'Dry season — irrigation supplementing', 'Minor leaf miner damage', 'Canopy development good despite dry conditions', 'a0000000-0000-0000-0000-000000000001'),
  ('b0000000-0000-0000-0000-000000000001', 'B1', '2025-10-10', 850.00, 9, 'Rains returned, ideal fruiting conditions', 'No significant pest pressure', 'Strong fruit set — first commercial harvest approaching', 'a0000000-0000-0000-0000-000000000001'),
  ('b0000000-0000-0000-0000-000000000001', 'B2', '2025-10-10', 720.00, 8, 'Rains returned, ideal fruiting conditions', 'Thrip monitoring in progress', 'Good fruit set but slightly behind Block B1', 'a0000000-0000-0000-0000-000000000001'),
  ('b0000000-0000-0000-0000-000000000001', 'B1', '2025-12-01', 2200.00, 9, 'Perfect harvest weather — warm and dry', 'Post-harvest cleanup done', 'First harvest complete — 2.2 tonnes from B1', 'a0000000-0000-0000-0000-000000000001'),
  ('b0000000-0000-0000-0000-000000000001', 'B2', '2025-12-01', 1800.00, 8, 'Perfect harvest weather — warm and dry', 'Post-harvest cleanup done', 'First harvest complete — 1.8 tonnes from B2', 'a0000000-0000-0000-0000-000000000001'),
  ('b0000000-0000-0000-0000-000000000001', 'B1', '2026-02-15', NULL, 8, 'Heavy rains — 180mm in February', 'Monitoring for root rot due to excess moisture', 'Post-harvest recovery, pruning completed', 'a0000000-0000-0000-0000-000000000001'),
  ('b0000000-0000-0000-0000-000000000001', 'B3', '2026-02-15', NULL, 7, 'Heavy rains — 180mm in February', 'New planting area — no pest history yet', 'Block B3 preparation underway for expansion', 'a0000000-0000-0000-0000-000000000001');

-- ============================================
-- 5 SUPPORT TICKETS
-- ============================================
INSERT INTO support_tickets (investor_id, subject, status, priority, assigned_to, messages, created_at) VALUES
  ('c0000000-0000-0000-0000-000000000002', 'When will I receive my tree certificate?', 'resolved', 'normal', 'a0000000-0000-0000-0000-000000000001',
   '[{"id":"msg_001","sender":"investor","sender_name":"Sarah Johnson","body":"Hi, I purchased 5 trees in January but have not received my certificate yet. Could you please advise?","timestamp":"2025-02-01T10:00:00Z"},{"id":"msg_002","sender":"admin","sender_name":"Ziad Mukheimer","body":"Hi Sarah, thank you for reaching out. Your certificate has been generated and sent to your email. Please check your spam folder. Let us know if you need it resent.","timestamp":"2025-02-01T14:30:00Z"},{"id":"msg_003","sender":"investor","sender_name":"Sarah Johnson","body":"Found it in spam — thank you!","timestamp":"2025-02-01T16:00:00Z"}]'::jsonb,
   '2025-02-01 10:00:00+00'),

  ('c0000000-0000-0000-0000-000000000009', 'Payout bank details update', 'in_progress', 'high', 'a0000000-0000-0000-0000-000000000001',
   '[{"id":"msg_004","sender":"investor","sender_name":"Omar Hassan","body":"I need to update my bank account details for the upcoming payout. I switched banks recently.","timestamp":"2026-01-15T09:00:00Z"},{"id":"msg_005","sender":"admin","sender_name":"Ziad Mukheimer","body":"Hi Omar, please send us the new bank details via the secure form we have emailed to you. We will update before the next payout cycle.","timestamp":"2026-01-15T11:00:00Z"}]'::jsonb,
   '2026-01-15 09:00:00+00'),

  ('c0000000-0000-0000-0000-000000000013', 'Can I visit the farm?', 'resolved', 'low', 'a0000000-0000-0000-0000-000000000001',
   '[{"id":"msg_006","sender":"investor","sender_name":"Khalid Al Mansour","body":"I am planning a trip to Uganda next month. Is it possible to visit the Mukono farm and see my trees?","timestamp":"2025-06-10T08:00:00Z"},{"id":"msg_007","sender":"admin","sender_name":"Ziad Mukheimer","body":"Absolutely, Khalid! We would love to host you. Please share your travel dates and we will arrange a guided tour of the farm. We recommend 2-3 hours for the full experience.","timestamp":"2025-06-10T12:00:00Z"},{"id":"msg_008","sender":"investor","sender_name":"Khalid Al Mansour","body":"Wonderful — I will be there July 15-20. Let me know what works best.","timestamp":"2025-06-11T09:00:00Z"}]'::jsonb,
   '2025-06-10 08:00:00+00'),

  ('c0000000-0000-0000-0000-000000000020', 'Tree health concern', 'open', 'normal', NULL,
   '[{"id":"msg_009","sender":"investor","sender_name":"Emma Wilson","body":"I saw in the last crop report that Block B2 had some leaf miner damage. Are my trees in that block? Should I be worried?","timestamp":"2026-03-01T06:00:00Z"}]'::jsonb,
   '2026-03-01 06:00:00+00'),

  ('c0000000-0000-0000-0000-000000000045', 'KYC rejection — appeal', 'open', 'urgent', 'a0000000-0000-0000-0000-000000000001',
   '[{"id":"msg_010","sender":"investor","sender_name":"Daniel Murphy","body":"My KYC was rejected but I believe I submitted all required documents. Can you please review again? I have attached updated passport scan and utility bill.","timestamp":"2026-03-10T14:00:00Z"},{"id":"msg_011","sender":"admin","sender_name":"Ziad Mukheimer","body":"Hi Daniel, we are reviewing your updated documents now. The initial rejection was due to an expired ID. We will get back to you within 48 hours.","timestamp":"2026-03-10T16:30:00Z"}]'::jsonb,
   '2026-03-10 14:00:00+00');

-- ============================================
-- UPDATE PROJECT COUNTERS
-- ============================================
UPDATE projects SET sold_trees = 100 WHERE id = 'b0000000-0000-0000-0000-000000000001';
