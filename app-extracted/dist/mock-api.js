const http = require('http');
const url = require('url');

// ─── USERS & CREDENTIALS ─────────────────────────────────────
const users = {
  'rahul.sharma@example.com': {
    id: 1,
    email: 'rahul.sharma@example.com',
    fullName: 'Rahul Sharma',
    phone: '+919819988776',
    role: 'USER',
    password: 'User@ParkCloud2026!'
  },
  'rahul@parkcloud.in': {
    id: 1,
    email: 'rahul@parkcloud.in',
    fullName: 'Rahul Sharma',
    phone: '+919819988776',
    role: 'USER',
    password: 'User@ParkCloud2026!'
  },
  'admin@parkcloud.in': {
    id: 2,
    email: 'admin@parkcloud.in',
    fullName: 'Admin (Operations)',
    phone: '+919800011223',
    role: 'ADMIN',
    password: 'Admin@ParkCloud2026!'
  }
};

let currentUser = users['rahul.sharma@example.com'];
let nextBookingId = 2684;
let nextVehicleId = 104;
let nextFileId = 105;

// ─── PARKING LOTS ────────────────────────────────────────────
const lots = [
  {
    id: 1,
    name: 'Phoenix Marketcity Mall Smart Lot',
    address: 'LBS Marg, Kurla West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400070',
    description: 'Multi-level covered smart bay parking with automated license plate recognition (HSRP) and fast EV stations.',
    operating_start_hour: 6,
    operating_end_hour: 23,
    total_slots: 450,
    rate_two_wheeler_paise: 2000,
    rate_four_wheeler_paise: 5000,
    rate_ev_paise: 4000,
    hourlyRate: 50,
    dailyRate: 350,
    rating: 4.8,
    isActive: true,
    latitude: 19.0860,
    longitude: 72.8890
  },
  {
    id: 2,
    name: 'BKC Business Hub Parking',
    address: 'Bandra Kurla Complex, G Block',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400051',
    description: 'Executive corporate parking hub with premium valet, security surveillance and reserved bays.',
    operating_start_hour: 5,
    operating_end_hour: 24,
    total_slots: 200,
    rate_two_wheeler_paise: 3000,
    rate_four_wheeler_paise: 8000,
    rate_ev_paise: 6000,
    hourlyRate: 80,
    dailyRate: 700,
    rating: 4.7,
    isActive: true,
    latitude: 19.0660,
    longitude: 72.8690
  },
  {
    id: 3,
    name: 'FC Road Smart Park',
    address: 'Fergusson College Road, Shivajinagar',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411004',
    description: 'Central shopping precinct parking with fast automated gate boom-barrier access.',
    operating_start_hour: 7,
    operating_end_hour: 23,
    total_slots: 120,
    rate_two_wheeler_paise: 1500,
    rate_four_wheeler_paise: 4000,
    rate_ev_paise: 3500,
    hourlyRate: 40,
    dailyRate: 300,
    rating: 4.4,
    isActive: true,
    latitude: 18.5204,
    longitude: 73.8567
  },
  {
    id: 4,
    name: 'Viviana Mall Multi-Tier',
    address: 'Eastern Express Highway, Laxmi Nagar',
    city: 'Thane',
    state: 'Maharashtra',
    pincode: '400606',
    description: 'Spacious multi-tier indoor parking with designated disabled, women-driver and EV fast bays.',
    operating_start_hour: 8,
    operating_end_hour: 24,
    total_slots: 350,
    rate_two_wheeler_paise: 2000,
    rate_four_wheeler_paise: 4000,
    rate_ev_paise: 3500,
    hourlyRate: 40,
    dailyRate: 320,
    rating: 4.6,
    isActive: true,
    latitude: 19.2080,
    longitude: 72.9720
  },
  {
    id: 5,
    name: 'Indiranagar Metro Hub',
    address: '100 Feet Road, HAL 2nd Stage',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    description: 'Park & Ride transit hub seamlessly integrated with Namma Metro green and purple lines.',
    operating_start_hour: 5,
    operating_end_hour: 24,
    total_slots: 100,
    rate_two_wheeler_paise: 2500,
    rate_four_wheeler_paise: 6000,
    rate_ev_paise: 5000,
    hourlyRate: 60,
    dailyRate: 450,
    rating: 4.5,
    isActive: true,
    latitude: 12.9784,
    longitude: 77.6408
  }
];

// ─── VEHICLES ────────────────────────────────────────────────
const vehicles = [
  {
    id: 1,
    user_id: 1,
    registration_number: '22BH1234AA',
    vehicle_type: 'FOUR_WHEELER',
    nickname: 'Primary Nexon EV',
    created_at: '2026-09-01T10:00:00Z'
  },
  {
    id: 2,
    user_id: 1,
    registration_number: 'MH02DE4567',
    vehicle_type: 'FOUR_WHEELER',
    nickname: 'Honda City',
    created_at: '2026-09-15T12:00:00Z'
  },
  {
    id: 3,
    user_id: 1,
    registration_number: 'MH01AB9988',
    vehicle_type: 'TWO_WHEELER',
    nickname: 'Activa 6G',
    created_at: '2026-10-01T08:30:00Z'
  }
];

// ─── BOOKINGS ────────────────────────────────────────────────
const bookings = [
  {
    id: 2683,
    booking_reference: 'PC-BKG-2683',
    bookingReference: 'PC-BKG-2683',
    user_id: 1,
    lot_id: 1,
    lot_name: 'Phoenix Marketcity Mall Smart Lot',
    lotName: 'Phoenix Marketcity Mall Smart Lot',
    lot_address: 'LBS Marg, Kurla West',
    lot_city: 'Mumbai',
    slot_number: 'P1-04',
    slotNumber: 'P1-04',
    registration_number: '22BH1234AA',
    registrationNumber: '22BH1234AA',
    vehicle_type: 'FOUR_WHEELER',
    vehicleType: 'FOUR_WHEELER',
    startTimeIST: '21/10/2026, 01:05 pm',
    scheduled_start: '2026-10-21T07:35:00Z',
    accrued_fee: '₹118.00',
    estimated_fee: '₹118.00',
    amount: 118,
    status: 'CONFIRMED',
    created_at: '2026-10-20T10:00:00Z'
  },
  {
    id: 2682,
    booking_reference: 'PC-BKG-2682',
    bookingReference: 'PC-BKG-2682',
    user_id: 1,
    lot_id: 1,
    lot_name: 'Phoenix Marketcity Mall Smart Lot',
    lotName: 'Phoenix Marketcity Mall Smart Lot',
    lot_address: 'LBS Marg, Kurla West',
    lot_city: 'Mumbai',
    slot_number: 'P1-02',
    slotNumber: 'P1-02',
    registration_number: 'MH02DE4567',
    registrationNumber: 'MH02DE4567',
    vehicle_type: 'FOUR_WHEELER',
    vehicleType: 'FOUR_WHEELER',
    startTimeIST: '20/10/2026, 12:35 pm',
    scheduled_start: '2026-10-20T07:05:00Z',
    accrued_fee: '₹141.60',
    estimated_fee: '₹141.60',
    amount: 141.6,
    status: 'ACTIVE',
    created_at: '2026-10-20T06:45:00Z'
  },
  {
    id: 2601,
    booking_reference: 'PC-BKG-2601',
    bookingReference: 'PC-BKG-2601',
    user_id: 1,
    lot_id: 2,
    lot_name: 'BKC Business Hub Parking',
    lotName: 'BKC Business Hub Parking',
    lot_address: 'Bandra Kurla Complex',
    lot_city: 'Mumbai',
    slot_number: 'B2-11',
    slotNumber: 'B2-11',
    registration_number: '22BH1234AA',
    registrationNumber: '22BH1234AA',
    vehicle_type: 'FOUR_WHEELER',
    vehicleType: 'FOUR_WHEELER',
    startTimeIST: '15/10/2026, 09:00 am',
    scheduled_start: '2026-10-15T03:30:00Z',
    accrued_fee: '₹240.00',
    estimated_fee: '₹240.00',
    amount: 240,
    status: 'COMPLETED',
    created_at: '2026-10-15T03:00:00Z'
  }
];

// ─── S3 AUDIT REPORTS ────────────────────────────────────────
const files = [
  {
    id: 101,
    file_name: 'ParkCloud_Audit_Summary_2026-10-20.pdf',
    file_type: 'REPORT_PDF',
    file_size_bytes: 284920,
    s3_bucket: 'parkcloud-storage-ap-south-1-i4dkpdh5',
    s3_key: 'report_pdfs/ParkCloud_Audit_Summary_2026-10-20.pdf',
    created_at: '2026-10-20T08:15:00Z'
  },
  {
    id: 102,
    file_name: 'Utilization_Logs_Mumbai_Q3.csv',
    file_type: 'REPORT_CSV',
    file_size_bytes: 142100,
    s3_bucket: 'parkcloud-storage-ap-south-1-i4dkpdh5',
    s3_key: 'report_csvs/Utilization_Logs_Mumbai_Q3.csv',
    created_at: '2026-10-19T14:30:00Z'
  },
  {
    id: 103,
    file_name: 'Revenue_Reconciliation_October.pdf',
    file_type: 'REPORT_PDF',
    file_size_bytes: 412800,
    s3_bucket: 'parkcloud-storage-ap-south-1-i4dkpdh5',
    s3_key: 'report_pdfs/Revenue_Reconciliation_October.pdf',
    created_at: '2026-10-18T18:00:00Z'
  }
];

// ─── SLOTS GENERATOR ─────────────────────────────────────────
function generateSlotsForLot(lot, vehicleType) {
  const prefix = vehicleType === 'TWO_WHEELER' ? 'B' : vehicleType === 'EV' ? 'EV' : 'P1';
  const category = vehicleType === 'EV' ? 'EV_CHARGING' : (vehicleType === 'TWO_WHEELER' ? 'TWO_WHEELER' : 'STANDARD');
  const slots = [];
  
  for (let i = 1; i <= 20; i++) {
    const isOccupied = i === 2 || (i % 4 === 0);
    slots.push({
      id: 1000 + i,
      lot_id: lot.id,
      slot_number: `${prefix}-${String(i).padStart(2, '0')}`,
      slotNumber: `${prefix}-${String(i).padStart(2, '0')}`,
      category: (i === 1 || i === 5 || category === 'EV_CHARGING') ? 'EV_CHARGING' : category,
      is_available: !isOccupied,
      isAvailable: !isOccupied,
      floor: 1
    });
  }
  return slots;
}

// ─── HELPERS ─────────────────────────────────────────────────
function json(res, data, status = 200) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

function buildValidPdf(title) {
  return Buffer.from(
`%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 280 >>
stream
BT
/F1 18 Tf
50 720 Td
(ParkCloud - Smart Parking Audit Report) Tj
/F1 12 Tf
0 -30 Td
(Cluster: ap-south-1 \\(Mumbai\\) | Status: Verified) Tj
0 -25 Td
(Report: ` + title + `) Tj
0 -25 Td
(Total System Bookings: 148 | Active Utilization: 64%) Tj
0 -25 Td
(Accrued Demo Parking Revenue: INR 18,450.00) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f \r
0000000009 00000 n \r
0000000058 00000 n \r
0000000115 00000 n \r
0000000234 00000 n \r
0000000305 00000 n \r
trailer
<< /Size 6 /Root 1 0 R >>
startxref
640
%%EOF`);
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try { resolve(JSON.parse(body)); } catch { resolve({}); }
    });
  });
}

// ─── SERVER ──────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const path = parsed.pathname;
  const method = req.method;

  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  // ── AUTH ──
  if (path === '/api/auth/login' && method === 'POST') {
    const body = await readBody(req);
    const email = (body.email || '').toLowerCase().trim();
    const user = users[email] || Object.values(users).find(u => u.email.toLowerCase() === email);

    if (user && (user.password === body.password || body.password === 'demo123' || body.password === 'admin123' || body.password === 'User@ParkCloud2026!' || body.password === 'Admin@ParkCloud2026!')) {
      currentUser = user;
      return json(res, {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          phone: user.phone,
          role: user.role
        },
        token: 'parkcloud-token-' + user.id
      });
    }
    return json(res, { success: false, message: 'Invalid credentials. Please click Quick Fill.' }, 401);
  }

  if (path === '/api/auth/me' && method === 'GET') {
    if (currentUser) {
      return json(res, {
        success: true,
        user: {
          id: currentUser.id,
          email: currentUser.email,
          fullName: currentUser.fullName,
          phone: currentUser.phone,
          role: currentUser.role
        }
      });
    }
    return json(res, { success: false, message: 'Not authenticated' }, 401);
  }

  if (path === '/api/auth/logout' && method === 'POST') {
    currentUser = null;
    return json(res, { success: true });
  }

  // ── LOTS ──
  if (path === '/api/lots' && method === 'GET') {
    return json(res, { success: true, lots });
  }

  const lotMatch = path.match(/^\/api\/lots\/(\d+)$/);
  if (lotMatch && method === 'GET') {
    const lot = lots.find(l => l.id === parseInt(lotMatch[1])) || lots[0];
    return json(res, { success: true, lot });
  }

  const availMatch = path.match(/^\/api\/lots\/(\d+)\/availability$/);
  if (availMatch && method === 'GET') {
    const lot = lots.find(l => l.id === parseInt(availMatch[1])) || lots[0];
    const vehicleType = parsed.query.vehicleType || 'FOUR_WHEELER';
    const slots = generateSlotsForLot(lot, vehicleType);
    return json(res, {
      success: true,
      lot,
      slots,
      totalSlots: slots.length,
      availableSlots: slots.filter(s => s.is_available).length
    });
  }

  const slotsMatch = path.match(/^\/api\/lots\/(\d+)\/slots$/);
  if (slotsMatch) {
    const lot = lots.find(l => l.id === parseInt(slotsMatch[1])) || lots[0];
    const vehicleType = parsed.query.vehicleType || 'FOUR_WHEELER';
    const slots = generateSlotsForLot(lot, vehicleType);
    return json(res, { success: true, slots });
  }

  // ── VEHICLES ──
  if (path === '/api/vehicles' && method === 'GET') {
    return json(res, { success: true, vehicles });
  }
  if (path === '/api/vehicles' && method === 'POST') {
    const body = await readBody(req);
    const v = {
      id: nextVehicleId++,
      user_id: currentUser ? currentUser.id : 1,
      registration_number: body.registration_number || body.registrationNumber || '22BH9999ZZ',
      vehicle_type: body.vehicle_type || body.vehicleType || 'FOUR_WHEELER',
      nickname: body.nickname || 'Vehicle',
      created_at: new Date().toISOString()
    };
    vehicles.push(v);
    return json(res, { success: true, vehicle: v }, 201);
  }

  const vehicleMatch = path.match(/^\/api\/vehicles\/(\d+)$/);
  if (vehicleMatch && method === 'DELETE') {
    const vId = parseInt(vehicleMatch[1]);
    const idx = vehicles.findIndex(v => v.id === vId);
    if (idx !== -1) vehicles.splice(idx, 1);
    return json(res, { success: true });
  }

  // ── BOOKINGS ──
  if (path === '/api/bookings/my' && method === 'GET') {
    return json(res, { success: true, bookings });
  }
  if (path === '/api/bookings' && method === 'GET') {
    return json(res, { success: true, bookings });
  }
  if (path === '/api/bookings/admin/all' && method === 'GET') {
    return json(res, { success: true, bookings, total: bookings.length, page: 1, limit: 50 });
  }
  if (path === '/api/bookings' && method === 'POST') {
    const body = await readBody(req);
    const lot = lots.find(l => l.id === (body.lot_id || body.lotId)) || lots[0];
    const veh = vehicles.find(v => v.id === (body.vehicle_id || body.vehicleId)) || vehicles[0];
    
    const b = {
      id: nextBookingId++,
      booking_reference: `PC-BKG-${nextBookingId}`,
      bookingReference: `PC-BKG-${nextBookingId}`,
      user_id: currentUser ? currentUser.id : 1,
      lot_id: lot.id,
      lot_name: lot.name,
      lotName: lot.name,
      lot_address: lot.address,
      lot_city: lot.city,
      slot_number: body.slotNumber || body.slot_number || 'P1-05',
      slotNumber: body.slotNumber || body.slot_number || 'P1-05',
      registration_number: veh ? veh.registration_number : '22BH1234AA',
      registrationNumber: veh ? veh.registration_number : '22BH1234AA',
      vehicle_type: veh ? veh.vehicle_type : 'FOUR_WHEELER',
      vehicleType: veh ? veh.vehicle_type : 'FOUR_WHEELER',
      startTimeIST: new Date().toLocaleDateString('en-IN') + ', ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      scheduled_start: body.startTime || new Date().toISOString(),
      accrued_fee: `₹${body.amount || 118}.00`,
      estimated_fee: `₹${body.amount || 118}.00`,
      amount: body.amount || 118,
      status: 'CONFIRMED',
      created_at: new Date().toISOString()
    };
    bookings.unshift(b);
    return json(res, { success: true, booking: b }, 201);
  }

  const cancelMatch = path.match(/^\/api\/bookings\/(\d+)\/cancel$/);
  if (cancelMatch && method === 'POST') {
    const b = bookings.find(x => x.id === parseInt(cancelMatch[1]));
    if (b) b.status = 'CANCELLED';
    return json(res, { success: true, booking: b });
  }

  if (path === '/api/bookings/check-in' && method === 'POST') {
    const body = await readBody(req);
    const b = bookings.find(x => x.booking_reference === body.bookingReference || x.bookingReference === body.bookingReference);
    if (b) b.status = 'ACTIVE';
    return json(res, { success: true, message: `Gate check-in approved for ${body.bookingReference}` });
  }

  if (path === '/api/bookings/check-out' && method === 'POST') {
    const body = await readBody(req);
    const b = bookings.find(x => x.booking_reference === body.bookingReference || x.bookingReference === body.bookingReference);
    if (b) b.status = 'COMPLETED';
    return json(res, { success: true, message: `Check-out finalized for ${body.bookingReference}` });
  }

  // ── ANALYTICS (EXACT SCHEMA MATCH FOR V_) ──────────────────────
  if (path === '/api/analytics/summary') {
    return json(res, {
      success: true,
      occupancyRate: 64,
      occupiedSlots: 782,
      totalSlots: 1220,
      bookings: {
        total: 148,
        active: 3,
        confirmed: 5,
        completed: 132,
        cancelled: 8
      },
      accruedFees: {
        raw: 18450.00,
        formatted: '₹18,450.00'
      },
      completionRate: 94.2,
      peakHour: '13:00'
    });
  }

  // Bar chart requires { hour, count }
  if (path === '/api/analytics/peak-hours') {
    const peakHours = [];
    for (let h = 0; h < 24; h++) {
      let count = 2;
      if (h >= 6 && h < 9) count = 15 + (h - 6) * 12;
      else if (h >= 9 && h <= 14) count = 55 + Math.round(Math.sin(h) * 15);
      else if (h > 14 && h <= 19) count = 65 + Math.round(Math.cos(h) * 20);
      else if (h > 19 && h <= 23) count = 25 - (h - 19) * 5;
      peakHours.push({ hour: h, count: Math.max(1, count) });
    }
    return json(res, { success: true, peakHours });
  }

  // Heatmap table requires [ { day: "Monday", hours: [ { hour: 0..23, count: X } ] } ]
  if (path === '/api/analytics/heatmap') {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const heatmap = days.map((day, dIdx) => {
      const hours = [];
      for (let h = 0; h < 24; h++) {
        let count = 0;
        if (h >= 8 && h <= 21) {
          const base = dIdx >= 4 ? 3 : 2;
          count = Math.floor(Math.random() * 3) + base;
        } else if (h >= 6 && h <= 23) {
          count = Math.floor(Math.random() * 2);
        }
        hours.push({ hour: h, count });
      }
      return { day, hours };
    });
    return json(res, { success: true, heatmap });
  }

  // Line chart forecast requires { success: true, forecast: [ { label, projectedOccupancyPercent } ], disclaimer }
  if (path === '/api/analytics/forecast') {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const forecast = days.map((label, idx) => ({
      label: `${label} (Proj)`,
      projectedOccupancyPercent: [65, 72, 75, 78, 82, 89, 93][idx] || 75
    }));
    return json(res, {
      success: true,
      forecast,
      disclaimer: 'Statistical regression model trained on rolling 90-day booking transactions in Asia/Kolkata (IST).'
    });
  }

  // ── DRIVER / USER ANALYTICS ──────────────────────────────────
  if (path === "/api/analytics/driver" || path === "/api/analytics/user") {
    const userBookings = bookings.filter(b => !currentUser || b.user_id === currentUser.id);
    const totalSpent = userBookings.reduce((sum, b) => {
      const amt = typeof b.amount === "number" ? b.amount : parseFloat(String(b.accrued_fee || "").replace(/[^0-9.]/g, "")) || 118;
      return sum + amt;
    }, 0);
    const userVehicles = vehicles.filter(v => !currentUser || v.user_id === currentUser.id);
    return json(res, {
      success: true,
      role: currentUser ? currentUser.role : "USER",
      driverName: currentUser ? currentUser.fullName : "Rahul Sharma",
      totalTrips: userBookings.length,
      totalSpent: totalSpent,
      formattedSpent: "₹" + totalSpent.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      activeVehiclesCount: userVehicles.length || 1,
      primaryBay: "Phoenix Marketcity, Kurla",
      primaryBayPercent: 60,
      avgDurationHours: 2.4,
      ecoScore: 94,
      co2SavedKg: 4.8,
      monthlySpending: [
        { month: "May", spend: 180, trips: 2 },
        { month: "Jun", spend: 240, trips: 2 },
        { month: "Jul", spend: 120, trips: 1 },
        { month: "Aug", spend: 350, trips: 3 },
        { month: "Sep", spend: 472, trips: 4 },
        { month: "Oct", spend: totalSpent || 708, trips: userBookings.length || 6 }
      ],
      locationBreakdown: [
        { name: "Phoenix Marketcity", trips: 4, spend: 472 },
        { name: "Bandra Kurla Complex", trips: 2, spend: 236 },
        { name: "Chhatrapati Shivaji T2", trips: 1, spend: 118 }
      ]
    });
  }

  // ── S3 AUDIT REPORTS ─────────────────────────────────────────
  if (path === '/api/files' && method === 'GET') {
    return json(res, { success: true, files });
  }

  if (path === '/api/files/generate-report' && method === 'POST') {
    const body = await readBody(req);
    const fmt = (body.format || 'PDF').toUpperCase();
    const newFile = {
      id: nextFileId++,
      file_name: `ParkCloud_Audit_${new Date().toISOString().slice(0, 10)}_${Math.floor(1000 + Math.random() * 9000)}.${fmt.toLowerCase()}`,
      file_type: fmt === 'CSV' ? 'REPORT_CSV' : 'REPORT_PDF',
      file_size_bytes: fmt === 'CSV' ? 128400 : 315600,
      s3_bucket: 'parkcloud-storage-ap-south-1-i4dkpdh5',
      s3_key: `report_${fmt === "PDF" ? "pdfs" : "csvs"}/report_${Date.now()}.${fmt.toLowerCase()}`,
      created_at: new Date().toISOString()
    };
    files.unshift(newFile);
    return json(res, {
      success: true,
      file: newFile
    });
  }

  const dlMatch = path.match(/^\/api\/files\/(\d+)\/download-url$/);
  if (dlMatch && method === 'GET') {
    const fileId = parseInt(dlMatch[1]);
    return json(res, {
      success: true,
      downloadUrl: `/api/download/${fileId}`,
      isPresignedS3: false
    });
  }

  const serveMatch = path.match(/^\/api\/download\/(\d+)$/);
  if (serveMatch) {
    const fileId = parseInt(serveMatch[1]);
    const file = files.find(f => f.id === fileId) || files[0];
    const isPdf = (file.file_type || '').includes('PDF') || (file.file_name || '').endsWith('.pdf');

    if (isPdf) {
      const pdfBuffer = buildValidPdf(file.file_name);
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${file.file_name}"`,
        'Content-Length': pdfBuffer.length,
        'Access-Control-Allow-Origin': '*'
      });
      return res.end(pdfBuffer);
    } else {
      const csv = 'BookingReference,LotName,VehiclePlate,TimeWindow,AccruedFee,Status\nPC-BKG-2683,Phoenix Marketcity Mall Smart Lot,22BH1234AA,21/10/2026 01:05 PM,118.00,CONFIRMED\nPC-BKG-2682,Phoenix Marketcity Mall Smart Lot,MH02DE4567,20/10/2026 12:35 PM,141.60,ACTIVE\nPC-BKG-2601,BKC Business Hub Parking,22BH1234AA,15/10/2026 09:00 AM,240.00,COMPLETED';
      res.writeHead(200, {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${file.file_name}"`,
        'Access-Control-Allow-Origin': '*'
      });
      return res.end(csv);
    }
  }

  // ── INVOICE PDF DOWNLOAD ──
  const invoiceMatch = path.match(/^\/api\/download\/invoice\/(\d+)$/);
  if (invoiceMatch) {
    const bookingId = parseInt(invoiceMatch[1]);
    const bk = bookings.find(b => b.id === bookingId) || bookings[0];
    const ref = bk.booking_reference || bk.bookingReference || 'PC-BKG-0000';
    const invNo = `INV-PC-${String(bk.id).padStart(5, '0')}`;
    const lotName = bk.lot_name || bk.lotName || 'Phoenix Marketcity';
    const plate = bk.registration_number || bk.registrationNumber || 'MH02AB1234';
    const rawAmt = typeof bk.amount === 'number' ? bk.amount : parseFloat(String(bk.accrued_fee || '118').replace(/[^0-9.]/g, '')) || 118;
    const baseAmt = (rawAmt / 1.18).toFixed(2);
    const gstAmt = (rawAmt - parseFloat(baseAmt)).toFixed(2);
    const totalAmt = rawAmt.toFixed(2);
    const dateStr = bk.startTimeIST || new Date(bk.created_at || Date.now()).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
    const slot = bk.slot_number || bk.slotNumber || 'P1-05';
    const status = bk.status || 'CONFIRMED';
    const custName = currentUser ? currentUser.fullName : 'Rahul Sharma';

    const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
6 0 obj
<< /Length 950 >>
stream
BT
/F1 22 Tf
50 740 Td
(PARKING INVOICE) Tj
/F2 10 Tf
400 740 Td
(${invNo}) Tj
/F1 14 Tf
50 700 Td
(ParkCloud India Pvt. Ltd.) Tj
/F2 10 Tf
50 685 Td
(GSTIN: 27AAGCP1234F1ZX | SAC: 996742) Tj
50 670 Td
(AWS Region: ap-south-1 \\(Mumbai\\) | DPDP Act 2023 Compliant) Tj
50 640 Td
(---------------------------------------------------------------) Tj
/F1 11 Tf
50 620 Td
(Bill To:) Tj
/F2 11 Tf
120 620 Td
(${custName}) Tj
/F1 11 Tf
50 600 Td
(Booking Ref:) Tj
/F2 11 Tf
150 600 Td
(${ref}) Tj
/F1 11 Tf
350 600 Td
(Date:) Tj
/F2 11 Tf
400 600 Td
(${dateStr}) Tj
/F1 11 Tf
50 575 Td
(Parking Bay:) Tj
/F2 11 Tf
150 575 Td
(${lotName}) Tj
/F1 11 Tf
50 555 Td
(Slot Number:) Tj
/F2 11 Tf
150 555 Td
(${slot}) Tj
/F1 11 Tf
350 555 Td
(Vehicle:) Tj
/F2 11 Tf
420 555 Td
(${plate}) Tj
/F1 11 Tf
50 535 Td
(Status:) Tj
/F2 11 Tf
120 535 Td
(${status}) Tj
50 505 Td
(---------------------------------------------------------------) Tj
/F1 11 Tf
50 480 Td
(Description) Tj
350 480 Td
(Amount) Tj
/F2 11 Tf
50 460 Td
(Parking Service Fee \\(Base\\)) Tj
350 460 Td
(INR ${baseAmt}) Tj
50 440 Td
(CGST @ 9%) Tj
350 440 Td
(INR ${(parseFloat(gstAmt)/2).toFixed(2)}) Tj
50 420 Td
(SGST @ 9%) Tj
350 420 Td
(INR ${(parseFloat(gstAmt)/2).toFixed(2)}) Tj
50 395 Td
(---------------------------------------------------------------) Tj
/F1 12 Tf
50 370 Td
(Total Payable) Tj
350 370 Td
(INR ${totalAmt}) Tj
/F2 9 Tf
50 330 Td
(Payment: FASTag Auto-Debit \\(ICICI Bank\\) | Transaction verified via ParkCloud Gateway) Tj
50 315 Td
(This is a computer-generated invoice. No signature required.) Tj
ET
endstream
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000266 00000 n 
0000000339 00000 n 
0000000406 00000 n 
trailer
<< /Size 7 /Root 1 0 R >>
startxref
1408
%%EOF`;

    const pdfBuffer = Buffer.from(pdfContent);
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${invNo}_${ref}.pdf"`,
      'Content-Length': pdfBuffer.length,
      'Access-Control-Allow-Origin': '*'
    });
    return res.end(pdfBuffer);
  }

  // ── HEALTH ──
  if (path === '/api/health' || path === '/health') {
    return json(res, { status: 'ok', timestamp: new Date().toISOString() });
  }

  json(res, { success: true });
});

server.listen(5000, '0.0.0.0', () => {
  console.log('ParkCloud Mock API Server running on port 5000');
});
