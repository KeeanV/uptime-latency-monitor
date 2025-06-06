-- Targets (URLs to monitor)
CREATE TABLE targets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT,
  url TEXT NOT NULL,
  expected_status INT DEFAULT 200,
  sla_cost_per_hour NUMERIC DEFAULT 0
);

-- Ping logs
CREATE TABLE logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  target_id UUID REFERENCES targets(id),
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  response_time_ms INT,
  status_code INT,
  success BOOLEAN
);
