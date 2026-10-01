/* Course content: diagram details, code examples and exercises.
   All code is wrapped in String.raw so backslashes stay literal. */
window.TDE = window.TDE || {};

/* ------------------------------------------------------------------ diagrams */

const sharedBuild = {
  title: "Build and correlate",
  body: `<p>The tester is fabricated and proven before the line depends on it.</p>
    <ul><li><b>TDE does:</b> make the fixture, interface board and harness, load the software, bring it up with <em>golden units</em> (known good) and <em>known-bad units</em>.</li>
    <li><b>Proves:</b> measurements are accurate and repeatable, the test catches the defects it should, and test time fits the line.</li>
    <li><b>Watch out:</b> long-lead parts (instruments, pogo-pin blocks). Order them at concept time.</li></ul>`,
};
const sharedDeliver = {
  title: "Deliver to MFG",
  body: `<p>The tester leaves the lab and goes to the line.</p>
    <ul><li><b>TDE does:</b> install, run on NPI / pilot builds, train operators and technicians, release the software version and documents.</li>
    <li><b>Then:</b> stay on as support in the sustaining phase.</li>
    <li><b>Watch out:</b> a tester that only its builder can run is not delivered.</li></ul>`,
};

TDE.DIAGRAMS = {
  engagement: {
    "cm-design": {
      title: "CM: customer design release",
      body: `<p>In a Contract Manufacturing (CM) program the <b>customer owns the design</b>. We receive a design package (schematics, BOM, specification, firmware).</p>
        <ul><li><b>TDE does:</b> works out what must be tested, with which coverage, volume and test-time target.</li>
        <li><b>Ask early:</b> expected yield, quality target, whether the customer supplies a test platform or expects us to design one.</li></ul>`,
    },
    "cm-review": {
      title: "CM: design review for test (DFT)",
      body: `<p>Look at the design through a tester's eyes while changes are still cheap.</p>
        <ul><li><b>Check:</b> test points and probe access, JTAG / programming headers, connectors, power-up sequence, board size and clearances for a fixture.</li>
        <li><b>With:</b> TE and the customer's engineers.</li>
        <li><b>Output:</b> a list of testability issues and requests, ranked by impact.</li></ul>`,
    },
    "cm-develop": {
      title: "CM: develop the test solution",
      body: `<p>Depends on the program: <b>software</b> on a platform that already exists, <b>hardware</b> (fixture, interface board), or both.</p>
        <ul><li><b>Output:</b> test specification, tester design, test software with a simulator so it can be developed and unit-tested without hardware.</li>
        <li><b>Review with:</b> TE and MFG before fabrication.</li></ul>`,
    },
    "cm-build": sharedBuild,
    "cm-deliver": sharedDeliver,

    "jdm-need": {
      title: "JDM: customer opportunity",
      body: `<p>In a Joint Development Manufacturing (JDM) program Celestica <b>co-develops the product</b> with the customer.</p>
        <ul><li><b>TDE does:</b> brings the test view from the very start. Cost of test, test time and testability change the product cost, so they belong in the first conversation.</li></ul>`,
    },
    "jdm-proposal": {
      title: "JDM: proposal",
      body: `<p>TDE, <b>HPS</b> (Hardware Platform Solution) and <b>TE</b> (Test Engineer) prepare a proposal for the customer.</p>
        <ul><li><b>Show:</b> the technology we propose, our way of working, and what makes our capability special (reusable tester platforms, local fabrication, experience).</li>
        <li><b>Include:</b> scope, plan, cost, risks, assumptions, support model.</li>
        <li>See <em>Deep dive → Writing a JDM proposal</em>.</li></ul>`,
    },
    "jdm-design": {
      title: "JDM: joint design (platform + test)",
      body: `<p>Because we help design the product, testability is built in rather than reviewed afterwards.</p>
        <ul><li><b>HPS</b> designs the hardware platform, <b>TE</b> defines test coverage, <b>TDE</b> designs the tester concept in parallel.</li>
        <li><b>Result:</b> test points, access and firmware hooks are in the first board spin.</li></ul>`,
    },
    "jdm-build": sharedBuild,
    "jdm-deliver": sharedDeliver,
  },

  phases: {
    proposal: {
      title: "Proposal (JDM)",
      body: `<p>Win the work. Describe how we will test the product and why our approach is the right one.</p>
        <ul><li><b>Output:</b> proposal with technology, capability, scope, plan, cost and risks.</li>
        <li><b>With:</b> HPS, TE, customer.</li><li>CM programs usually start at the next phase.</li></ul>`,
    },
    concept: {
      title: "Concept and DFT",
      body: `<p>Decide <em>what</em> will be tested, <em>where</em> in the line and <em>how</em>.</p>
        <ul><li><b>Output:</b> test strategy (stages and coverage), tester concept, DFT review findings, estimate of cost and schedule.</li>
        <li><b>Watch out:</b> promising coverage you have no physical access to measure.</li></ul>`,
    },
    design: {
      title: "Design",
      body: `<p>Detailed design of the whole test solution.</p>
        <ul><li><b>Hardware:</b> fixture mechanics, interface board schematic and layout, harness, instrument selection, safety.</li>
        <li><b>Software:</b> architecture, drivers, sequence, limits file, logging and MES interface.</li>
        <li><b>Review with:</b> TE, HPS, MFG.</li></ul>`,
    },
    fabricate: {
      title: "Fabricate",
      body: `<p>Turn the design into a physical tester.</p>
        <ul><li>Order parts, machine the fixture, build the interface PCB, assemble harnesses and the station, install software.</li>
        <li><b>Watch out:</b> lead time. Instruments and special connectors can take weeks.</li></ul>`,
    },
    debug: {
      title: "Debug and correlate",
      body: `<p>Prove the tester before trusting it.</p>
        <ul><li>Run golden units and known-bad units. Check accuracy, repeatability and test time.</li>
        <li>Set test limits (with guardband) from real measurements, not only from the datasheet.</li>
        <li><b>Exit criteria</b> are agreed in advance with TE and MFG.</li></ul>`,
    },
    npi: {
      title: "NPI / pilot builds",
      body: `<p>NPI (New Product Introduction): the first real builds. <b>Most of our work happens here.</b></p>
        <ul><li>Run on real units at line speed. Collect yield and false-fail data. Tune limits and software.</li>
        <li>Absorb design changes (ECOs) from the customer or HPS.</li>
        <li>Feed test data back: which defects, which process step.</li></ul>`,
    },
    handover: {
      title: "Handover to MFG",
      body: `<p>Manufacturing takes ownership of running the tester.</p>
        <ul><li><b>Package:</b> tester, released software version, work instruction, training, maintenance and calibration plan, spare parts, troubleshooting guide.</li>
        <li><b>Acceptance:</b> run-at-rate, correlation and repeatability criteria met, MFG signs off.</li></ul>`,
    },
    sustaining: {
      title: "Sustaining",
      body: `<p>Keep the tester healthy for the life of the product. We help maintain it.</p>
        <ul><li>Preventive maintenance (pin replacement, calibration), bug fixes and ECO updates.</li>
        <li>Yield and false-fail analysis, replicating testers for new lines or volume ramps.</li>
        <li>Obsolescence of instruments and parts, support to MFG when the line is down.</li></ul>`,
    },
  },

  line: {
    smt: {
      title: "SMT / assembly",
      body: `<p>Solder paste printing, component placement, reflow. Process defects are born here.</p>
        <ul><li><b>Not a test stage,</b> but its data is. Test results tell the process team which defect types appear and where.</li></ul>`,
    },
    aoi: {
      title: "SPI + AOI",
      body: `<p>Solder paste inspection and automated optical inspection.</p>
        <ul><li><b>Sees:</b> missing or skewed parts, bridges, some polarity marks.</li><li><b>Blind to:</b> electrical function, hidden joints (for example under BGAs).</li>
        <li>Usually run by manufacturing / process engineering. A TDE uses the data and avoids duplicating coverage.</li></ul>`,
    },
    ict: {
      title: "ICT / flying probe",
      body: `<p><b>In-circuit test</b> checks the assembly itself, part by part.</p>
        <ul><li><b>Bed-of-nails:</b> fast, for high volume, needs a fixture and test points.</li>
        <li><b>Flying probe:</b> no fixture, slower, ideal for prototypes, NPI and low volume.</li>
        <li><b>Finds:</b> shorts, opens, wrong or missing component values, some powered checks.</li>
        <li><b>Needs DFT:</b> probe access to nets. Ask in the design review.</li></ul>`,
    },
    fct: {
      title: "Functional test (FCT)",
      body: `<p>Power the board and check that it <b>works</b>.</p>
        <ul><li><b>Checks:</b> power rails, clocks, interfaces, firmware load and boot, sensors, key functions.</li>
        <li><b>Tools:</b> power supplies, multimeters, loads, scopes, switch matrices, serial console.</li>
        <li>This is where most TDE software effort goes. It is weaker than ICT at pinpointing which component is bad.</li></ul>`,
    },
    burnin: {
      title: "Burn-in / ESS",
      body: `<p>Heat, power cycling or stress to make early-life failures show up in the factory instead of in the field.</p>
        <ul><li>Used when the product or customer requires high reliability.</li>
        <li><b>Cost:</b> long time and floor space. Needs a clear data-based reason.</li></ul>`,
    },
    system: {
      title: "System / final test",
      body: `<p>Test of the assembled product.</p>
        <ul><li>Interfaces and interoperability, final firmware and configuration, sometimes load or traffic tests.</li>
        <li>Slowest and most realistic, so run only what earlier stages cannot see.</li></ul>`,
    },
    pack: {
      title: "Pack and ship",
      body: `<p>Final audit, labels, and a complete <b>traceability record</b>: every serial number linked to the results it passed.</p>
        <ul><li>If a test record is missing, the unit must not ship.</li></ul>`,
    },
  },

  tester: {
    sequence: {
      title: "Test sequence (software)",
      body: `<p>The program the operator runs.</p>
        <ul><li>Steps in order, each with a measurement and limits. Verdict per step and per unit.</li>
        <li>Operator interface: scan the serial number, show PASS / FAIL clearly.</li>
        <li>Limits live in a <b>versioned data file</b>, not scattered through code.</li>
        <li>Written in Python, C#, LabVIEW or a test executive. The structure is the same.</li></ul>`,
    },
    drivers: {
      title: "Drivers / abstraction",
      body: `<p>One thin wrapper per instrument or interface: SCPI over VISA, UART or SSH to the DUT console, digital I/O.</p>
        <ul><li>Lets you swap an instrument model without touching the sequence.</li>
        <li>Lets you <b>simulate</b> instruments so software is developed and unit-tested without hardware.</li>
        <li>Communication problems become <b>ERROR</b>, never FAIL. Do not scrap a good unit because a cable glitched.</li></ul>`,
    },
    instruments: {
      title: "Instruments and controller",
      body: `<p>Power supplies, multimeters, electronic loads, oscilloscopes, DAQ, switch matrices, programmers, and the PC or controller that runs them.</p>
        <ul><li>Instrument accuracy must be much tighter than the limit it checks. A common rule of thumb is 4:1 or better.</li>
        <li>Calibrate on a schedule and record it.</li></ul>`,
    },
    fixture: {
      title: "Fixture and interface",
      body: `<p>Where the tester physically meets the product: pogo pins or connectors, an interface board, harnesses, mechanical clamping, alignment and a DUT-present sensor.</p>
        <ul><li><b>Wear items:</b> pogo pins have a limited cycle life. Make them replaceable and count the cycles.</li>
        <li>Poor contact is the classic source of false fails.</li>
        <li>Keep analog and high-speed wiring short and well grounded.</li></ul>`,
    },
    dut: {
      title: "Device under test (DUT)",
      body: `<p>The board or product being tested.</p>
        <ul><li>Protect it: current limits before power-on, ESD precautions, never connect a supply to an unpowered sensitive net.</li>
        <li>Always return it to a safe state (outputs off) when the test ends, even after an error.</li></ul>`,
    },
    data: {
      title: "Data and traceability",
      body: `<p>Every test produces a record.</p>
        <ul><li>Serial number, station ID, software and limits version, timestamps, every measurement, verdict.</li>
        <li>Save locally first, then upload to MES (manufacturing execution system). Queue and retry if the network drops.</li>
        <li>Check routing: the right product at the right step.</li></ul>`,
    },
    safety: {
      title: "Safety and operator",
      body: `<p>People work at this station all day.</p>
        <ul><li>Emergency stop, interlocks on guards and covers, high-voltage warnings, ESD protection.</li>
        <li>Clear messages. Operators cannot skip steps or change limits.</li></ul>`,
    },
    calib: {
      title: "Calibration and upkeep",
      body: `<p>A tester drifts and wears. Plan for it.</p>
        <ul><li>Instrument calibration on schedule.</li><li>Golden-unit check at shift start. If it fails, stop the line and fix the tester, not the product.</li>
        <li>Pin-cycle counters, preventive maintenance, spare parts.</li></ul>`,
    },
  },

  rack: {
    frame: {
      title: "Open Rack frame",
      body: `<p>An OCP <b>Open Rack</b> is wider and taller per unit than a traditional rack.</p>
        <ul><li><b>Equipment width:</b> 21 inches, against 19 inches for the EIA rack most fixtures and cables were built for.</li>
        <li><b>Height unit:</b> OpenU (OU) = 48 mm, against 44.45 mm for 1U.</li>
        <li><b>Shared services at the rear:</b> a power busbar and, in liquid-cooled racks, a coolant manifold.</li>
        <li><b>Watch out:</b> do not assume that 19-inch fixtures, cable lengths or tester interfaces carry over. Check the mechanical drawings.</li></ul>`,
    },
    switch: {
      title: "Network switch (ToR)",
      body: `<p>The top-of-rack switch connects every node to the data-centre network.</p>
        <ul><li><b>TDE checks:</b> every link comes up at the right speed, optics and cables are the right type, the cable map matches the design.</li>
        <li><b>Watch out:</b> mislabelled cables look fine until the rack is in service.</li></ul>`,
    },
    powershelf: {
      title: "Power shelf",
      body: `<p>Converts the incoming supply (AC or high-voltage DC) into DC for the rack busbar, using hot-swappable rectifier modules. N+1 redundancy is typical.</p>
        <ul><li>In Open Rack V3 the busbar is <b>48 V DC</b>. Earlier versions used 12 V.</li>
        <li><b>TDE checks:</b> load test, redundancy (pull a module and the rack must stay up), efficiency, telemetry readings, hot-plug behaviour.</li></ul>`,
    },
    compute: {
      title: "Compute / GPU nodes",
      body: `<p>Servers in OpenU-sized sleds take DC power straight from the busbar through a blind-mate connector. They typically have no individual AC power supply.</p>
        <ul><li>In a liquid-cooled rack each node also has cold plates and quick disconnects at the rear that mate with the manifold when the node slides in.</li>
        <li><b>TDE checks:</b> node-level functional test and burn-in <em>before</em> racking, then insertion and blind-mate checks.</li></ul>`,
    },
    bbu: {
      title: "Battery backup (BBU)",
      body: `<p>A battery shelf on the same busbar keeps the rack running for a short ride-through after power is lost, until backup power starts or the load shuts down in a controlled way.</p>
        <ul><li><b>TDE checks:</b> charge, ride-through time under load, switch-over without a dropout, telemetry.</li>
        <li><b>Watch out:</b> batteries bring handling, safety and shipping rules.</li></ul>`,
    },
    busbar: {
      title: "DC busbar",
      body: `<p>A vertical copper bar at the rear distributes power. Each node clips onto it.</p>
        <ul><li><b>Why 48 V:</b> a 30 kW rack at 48 V carries about 625 A (30,000 W / 48 V). At 12 V it would be about 2,500 A. The 4x lower current means 16x lower resistive loss (I&sup2;R) in the same copper.</li>
        <li><b>Still a lot of current,</b> so contact quality and heating matter.</li>
        <li><b>TDE checks:</b> contact resistance, insertion-cycle wear, thermal imaging under load, safety interlocks.</li></ul>`,
    },
    manifold: {
      title: "Liquid manifold",
      body: `<p>Vertical <b>supply</b> and <b>return</b> pipes at the rear, with one port pair per node. Blind-mate quick disconnects let a node slide in without anyone handling hoses.</p>
        <ul><li><b>TDE checks:</b> leak and pressure decay of the whole manifold, flow balance across ports, quick-disconnect mating and cycle counting, fill and air purge.</li>
        <li><b>Watch out:</b> an unbalanced manifold starves the nodes at the far end.</li></ul>`,
    },
    cdu: {
      title: "CDU (in-rack or row)",
      body: `<p>The <b>Coolant Distribution Unit</b> holds the pump and heat exchanger. It separates the rack's coolant loop from the facility water and controls flow and temperature.</p>
        <ul><li>Some designs put a small CDU in the rack. Larger deployments use a row or room CDU for many racks.</li>
        <li><b>TDE checks:</b> pump speed and redundancy, control loop, alarms, sensor calibration, leak detection, interlocks.</li></ul>`,
    },
  },

  loop: {
    coldplate: {
      title: "Cold plate",
      body: `<p>A metal block, usually copper, with micro-channels or fins, clamped onto a hot chip (CPU, GPU, sometimes memory or voltage regulators) over a thermal interface material (TIM). Coolant flows through it and carries the heat away.</p>
        <ul><li><b>Watch out:</b> the channels are tiny. Particles clog them, so the loop needs filtration.</li>
        <li>The plate adds pressure drop (&Delta;P), which the pump must overcome.</li>
        <li><b>TDE checks:</b> flow and &Delta;P per plate, leak at fittings, mounting pressure, chip temperature under load.</li></ul>`,
    },
    qd: {
      title: "Quick disconnect (QD)",
      body: `<p>A dry-break coupling that lets a node be pulled without draining the loop. Blind-mate versions connect automatically when the node slides into the rack. OCP liquid-cooling work defines a Universal Quick Disconnect (UQD) family.</p>
        <ul><li>Each QD adds pressure drop and has a limited cycle life.</li>
        <li><b>Watch out:</b> dirt or damage on a coupling face is the classic source of drips.</li>
        <li><b>TDE checks:</b> leak after mating, mate and unmate cycle counts, protective caps fitted.</li></ul>`,
    },
    manifold: {
      title: "Rack manifold",
      body: `<p>Supply and return headers that feed every node in the rack.</p>
        <ul><li>Should deliver nearly equal flow to each node ("hydraulic balance").</li>
        <li>Has vents for air and a drain point.</li>
        <li><b>TDE checks:</b> pressure hold, leak, flow at each port.</li></ul>`,
    },
    cdu: {
      title: "CDU: pump and heat exchanger",
      body: `<p>Moves coolant round the rack loop and passes the heat to the facility water through a heat exchanger. Liquid-to-liquid is the usual type for water cooling. Liquid-to-air exists for sites without facility water.</p>
        <ul><li>Pumps are often redundant. Controls hold a supply temperature and a flow or pressure setpoint.</li>
        <li>Keeps the clean rack coolant separate from building water quality.</li></ul>`,
    },
    facility: {
      title: "Facility water (FWS)",
      body: `<p>The building-side loop that feeds the CDUs. Its temperature and pressure are set by the facility, not by the rack.</p>
        <ul><li><b>Warm-water designs</b> accept a high supply temperature, which lets the site use dry coolers instead of chillers and saves energy.</li>
        <li><b>Watch out:</b> keep supply water above the dew point or pipes and cold surfaces will sweat. ASHRAE defines facility-water temperature classes for this.</li></ul>`,
    },
    reject: {
      title: "Heat rejection",
      body: `<p>Where the heat finally leaves the building: chillers, cooling towers or dry coolers.</p>
        <ul><li>In a hot climate the outdoor temperature decides whether dry coolers alone can reach the supply temperature the racks need.</li>
        <li>That is why the allowed coolant temperature in the rack specification matters so much.</li></ul>`,
    },
    sensors: {
      title: "Sensors and controls",
      body: `<p>Supply and return temperature, flow, pressure (and &Delta;P), leak detection (rope or point sensors, drip trays), humidity or dew point, and sometimes coolant conductivity.</p>
        <ul><li>A controller or the node BMC reads them. Alarms can throttle or shut down a node.</li>
        <li><b>TDE checks:</b> calibrate the sensors, and use <b>fault injection</b> (stop the pump, close a valve, wet a leak sensor) to prove that the alarm and the protective action really happen.</li></ul>`,
    },
    conditioning: {
      title: "Fluid conditioning",
      body: `<p>Filter or strainer, expansion tank, air vents and purge points, make-up fluid, and inhibitors or biocide for water-glycol mixes.</p>
        <ul><li><b>Air in the loop</b> causes noise, uneven flow and hot spots, so a fill is followed by a purge.</li>
        <li>Coolant quality (particles, conductivity, pH) is checked and recorded.</li>
        <li><b>TDE checks:</b> follow the fill procedure, record the fluid batch, drain and dry before shipping if the program requires it.</li></ul>`,
    },
  },

  stand: {
    controller: {
      title: "Station controller",
      body: `<p>A PC or PLC that runs the test sequence and coordinates everything else: power, management network, liquid loop and load.</p>
        <ul><li>Runs the sequence as a state machine with interlocks. Power and load never start before the loop is full and leak-tight.</li>
        <li>Logs every step and uploads to MES, keyed by the node serial number.</li>
        <li>Same structure as exercise 7, with more instruments.</li></ul>`,
    },
    dcsource: {
      title: "Power: programmable DC source",
      body: `<p>Stands in for the rack's power shelf and busbar. It must supply the node's full current, which for a multi-kW node at 48 V is over a hundred amps.</p>
        <ul><li>Set voltage and current limits <em>before</em> enabling the output.</li>
        <li>Measure inrush when the node is powered, and measure efficiency with accurate meters.</li>
        <li><b>Watch out:</b> cables and connectors heat up at these currents. Use rated parts and watch their temperature.</li></ul>`,
    },
    mgmt: {
      title: "Management network",
      body: `<p>Gives the station access to the node's BMC and console.</p>
        <ul><li>Redfish or IPMI for sensors, firmware version, power control and logs. A serial console for boot messages.</li>
        <li>Keep it on its own network with a known IP, and keep clocks in sync (NTP) so records have trustworthy timestamps.</li>
        <li>A node that powers on but cannot be managed is a failed node.</li></ul>`,
    },
    liquid: {
      title: "Liquid loop (mini CDU)",
      body: `<p>A small cooling system of its own: pump, chiller or heat exchanger to set the supply temperature, filter, reservoir, and sensors for flow, pressure and temperature. It connects to the node through blind-mate quick disconnects.</p>
        <ul><li>Fill, purge and leak test happen here before any heat is applied.</li>
        <li>Needs a relief valve, a drip tray and a leak sensor.</li></ul>`,
    },
    load: {
      title: "Thermal load",
      body: `<p>Makes the node produce heat in a controlled way: the node's own stress software (CPU and GPU burn), or electrical heaters standing in for chips.</p>
        <ul><li>Apply load in a ramp, wait until readings are stable, then compare the electrical power with the heat carried away by the coolant (exercise 10).</li>
        <li>Watch for thermal throttling. It hides a cooling problem.</li></ul>`,
    },
    interface: {
      title: "Rack-emulating interface",
      body: `<p>The part that physically mimics the rack: busbar-style power contacts, blind-mate quick disconnects, guide rails, and presence sensing.</p>
        <ul><li><b>Wear items.</b> Contacts and QDs have a limited number of mating cycles. Count the cycles and make the parts replaceable.</li>
        <li>Alignment decides whether every insertion is the same. Check it with a golden node.</li>
        <li>A drip tray and protective caps keep spills off the electronics.</li></ul>`,
    },
    dut: {
      title: "Node under test (DUT)",
      body: `<p>The sled being tested. Scan its serial number first and record its firmware versions.</p>
        <ul><li>Handle it according to its weight (lift assist for heavy nodes).</li>
        <li>After a liquid test, drain and dry it if the program requires, and cap the quick disconnects.</li></ul>`,
    },
    safety: {
      title: "Safety",
      body: `<p>High current, liquid and heat share one station.</p>
        <ul><li>Emergency stop that removes power (and stops the pump if the program says so).</li>
        <li>Interlocks on guards and covers. A leak sensor under the rig that stops pump and power.</li>
        <li><b>Hardware</b> trips for over-current and over-temperature that work even if the software hangs.</li>
        <li>Pressure relief valve, drip tray, clear indicator lamps.</li></ul>`,
    },
  },

  nodeflow: {
    identify: {
      title: "Identify",
      body: `<p>Know exactly which node is on the bench.</p>
        <ul><li>Scan the serial number and check the route (right product, right step).</li>
        <li>Visual check: labels, connectors, bent pins, damage, coolant couplings capped.</li>
        <li>Record the BOM revision. A wrong revision explains many "mystery" failures.</li></ul>`,
    },
    power: {
      title: "Power and BMC",
      body: `<p>First power-on, with limits set.</p>
        <ul><li>Apply power from the stand (or the rack) with current limits. Check rails and inrush.</li>
        <li>The BMC should come up on the management network. Read its sensors and FRU data.</li>
        <li><b>Stop here</b> on a short, a missing rail or a BMC that never answers. There is no point running the rest.</li></ul>`,
    },
    firmware: {
      title: "Firmware and configuration",
      body: `<p>Make the node match its golden configuration.</p>
        <ul><li>Read BIOS, BMC, NIC, drive and accelerator firmware versions and compare them with the baseline for this SKU (exercise 13).</li>
        <li>Update only if the procedure allows it, then verify by reading back.</li>
        <li>Set BIOS options and provision identity (serial, MAC addresses). See example 12.</li></ul>`,
    },
    components: {
      title: "Component tests",
      body: `<p>Does everything the BOM promises actually work?</p>
        <ul><li>Inventory: CPUs, DIMM count, size and speed, drives, NICs, GPUs, PCIe link width and speed.</li>
        <li>Quick diagnostics for memory, storage, network links and accelerators.</li>
        <li>Fast and cheap: failures found here are easier to diagnose than failures found during stress.</li></ul>`,
    },
    stress: {
      title: "Stress and thermal soak",
      body: `<p>Run everything at once, for long enough to heat-soak the node.</p>
        <ul><li>CPU, memory, storage, network and accelerators loaded together.</li>
        <li>Watch temperatures, fan speeds or coolant flow, throttling, corrected ECC errors and logs.</li>
        <li>Pass criteria come from the test specification: duration, limits, and "no new errors".</li></ul>`,
    },
    final: {
      title: "Final checks and records",
      body: `<p>Close the test properly.</p>
        <ul><li>Review event logs (BMC, kernel) for anything unexpected during the run.</li>
        <li>Put the node in its shipping state (logs cleared if the procedure says so, boot order, power state).</li>
        <li>Write the record against the serial number: results, firmware versions, test software and limits version.</li></ul>`,
    },
    ready: {
      title: "Rack-ready",
      body: `<p>Hand the node on to rack integration.</p>
        <ul><li>Labels correct, protective caps on quick disconnects, drained and dry if the program requires it.</li>
        <li>Packed or staged safely. In the rack it meets the power, liquid and thermal tests of the rack test plan.</li></ul>`,
    },
  },
};

/* ------------------------------------------------------------------ examples */
const ghaYaml = String.raw`name: tester-software
on:
  pull_request:
  push:
    branches: [main]
    tags: ["v*"]            # a version tag is what MFG receives

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.12", cache: pip }
      - run: pip install -r requirements.txt
      # unit tests use simulated instruments: no hardware needed in CI
      - run: pytest tests -q --junitxml=reports/unit.xml
      - uses: actions/upload-artifact@v4
        if: always()
        with: { name: test-reports, path: reports/ }

  package:
    needs: test
    if: startsWith(github.ref, 'refs/tags/v')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build release package
        run: |
          mkdir dist
          zip -r dist/tester-sw-@@{{ github.ref_name }}.zip src limits docs
          cd dist && sha256sum *.zip > SHA256SUMS   # MFG can verify what they install
      - uses: actions/upload-artifact@v4
        with: { name: release, path: dist/ }`.replaceAll("@@{{", "$" + "{{");

TDE.EXAMPLES = [
  {
    id: "limits",
    title: "1. Limits and tolerance",
    runnable: true,
    intro: "Every test step ends in a comparison with limits. Try the tolerance maths and the boundary cases. Note how <b>integer millivolts</b> avoid floating-point surprises, and how <code>pytest.approx</code> handles computed floats. Press <b>Run</b>, then break something on purpose.",
    code: String.raw`import pytest

def tolerance_limits(nominal, pct):
    """Return (low, high) for nominal +/- pct percent."""
    delta = nominal * pct / 100
    return nominal - delta, nominal + delta

def in_limits(value, low, high):
    return low <= value <= high      # limits are inclusive

def test_limits_for_a_3v3_rail():
    low, high = tolerance_limits(3.3, 5)
    assert low == pytest.approx(3.135)
    assert high == pytest.approx(3.465)

@pytest.mark.parametrize("mv, ok", [
    (3134, False),    # 1 mV below the low limit
    (3135, True),     # ON the low limit
    (3465, True),     # ON the high limit
    (3466, False),    # 1 mV above the high limit
])
def test_boundaries_in_millivolts(mv, ok):
    assert in_limits(mv, 3135, 3465) == ok    # integers: exact, no float noise

def test_never_compare_computed_floats_with_equals():
    assert 3.3 * 1.05 == pytest.approx(3.465)
`,
  },
  {
    id: "parse",
    title: "2. Reading the DUT console",
    runnable: true,
    intro: "Many products report their state over a serial console (UART). The tester must pick the facts out of noisy output. A missing banner must be reported as <em>missing</em>, never silently treated as a pass.",
    code: String.raw`import re

BANNER = re.compile(
    r"BOOT (?P<status>OK|FAIL)\s+fw=(?P<fw>\d+\.\d+\.\d+)\s+sn=(?P<sn>\w+)")

def parse_boot(line):
    """'BOOT OK fw=1.4.2 sn=SN0012345' -> dict, or None if not a banner."""
    m = BANNER.search(line)
    return m.groupdict() if m else None

def find_banner(console_text):
    for line in console_text.splitlines():
        info = parse_boot(line)
        if info:
            return info
    return None

def test_parses_a_clean_banner():
    assert parse_boot("BOOT OK fw=1.4.2 sn=SN0012345") == {
        "status": "OK", "fw": "1.4.2", "sn": "SN0012345"}

def test_ignores_noise_around_the_banner():
    log = "\x1b[0m[   0.001] kernel start\n[   2.314] BOOT OK fw=2.0.1 sn=A7\nlogin:"
    assert find_banner(log)["fw"] == "2.0.1"

def test_boot_failure_is_reported_not_hidden():
    assert parse_boot("BOOT FAIL fw=1.0.0 sn=X1")["status"] == "FAIL"

def test_no_banner_means_none_not_a_pass():
    assert find_banner("kernel panic\n") is None
`,
  },
  {
    id: "driver",
    title: "3. Instrument driver + simulator",
    runnable: true,
    intro: "Hardware is not always on your desk. A simulated instrument with scripted readings lets you develop and unit-test tester software anywhere, and inject faults you could never trigger on purpose. Note the rule: retry <em>communication</em> errors, never a bad voltage.",
    code: String.raw`import pytest

class InstrumentError(Exception):
    """Communication problem (timeout, bus error). NOT a measurement result."""

class SimDmm:
    """Stands in for a real multimeter, with scripted readings."""
    def __init__(self, readings, fail_on_call=None):
        self.readings = list(readings)
        self.calls = 0
        self.fail_on_call = fail_on_call

    def read_voltage(self, channel):
        self.calls += 1
        if self.calls == self.fail_on_call:
            raise InstrumentError("VISA timeout")
        return self.readings.pop(0)

def measure_rail(dmm, channel, retries=1):
    """Read a rail. Retry communication errors only."""
    for attempt in range(retries + 1):
        try:
            return dmm.read_voltage(channel)
        except InstrumentError:
            if attempt == retries:
                raise

def test_returns_the_reading():
    assert measure_rail(SimDmm([3.31]), "3V3") == 3.31

def test_retries_once_after_a_comms_glitch():
    dmm = SimDmm([3.30], fail_on_call=1)
    assert measure_rail(dmm, "3V3") == 3.30
    assert dmm.calls == 2

def test_gives_up_when_retries_are_used_up():
    dmm = SimDmm([3.30], fail_on_call=1)
    with pytest.raises(InstrumentError):
        measure_rail(dmm, "3V3", retries=0)

def test_a_bad_voltage_is_returned_not_retried():
    dmm = SimDmm([0.0, 3.3])          # a dead rail reads 0 V
    assert measure_rail(dmm, "3V3") == 0.0
    assert dmm.calls == 1             # the verdict is the limit check's job
`,
  },
  {
    id: "cpk",
    title: "4. Is the measurement capable? (Cpk)",
    runnable: true,
    intro: "A passing result is only meaningful if the measurement is stable and well centred between the limits. <b>Cpk</b> expresses that as one number: how many times three standard deviations fit between the mean and the nearest limit. Many programs ask for 1.33 or more, so check your own requirement.",
    code: String.raw`import statistics
import pytest

def cpk(values, lsl, usl):
    """Process capability index for lower/upper spec limits."""
    mean = statistics.mean(values)
    sd = statistics.stdev(values)
    return min(usl - mean, mean - lsl) / (3 * sd)

def test_known_value():
    values = [9, 10, 11]                     # mean 10, sample stdev 1
    assert cpk(values, lsl=7, usl=13) == pytest.approx(1.0)

def test_centred_beats_off_centre():
    centred = [3.29, 3.30, 3.31, 3.30, 3.30, 3.29, 3.31, 3.30]
    drifted = [3.40, 3.41, 3.42, 3.41, 3.41, 3.40, 3.42, 3.41]
    assert cpk(centred, 3.135, 3.465) > cpk(drifted, 3.135, 3.465)

def test_tight_centred_rail_meets_a_1_33_target():
    centred = [3.29, 3.30, 3.31, 3.30, 3.30, 3.29, 3.31, 3.30]
    assert cpk(centred, 3.135, 3.465) >= 1.33
`,
  },
  {
    id: "limitsfile",
    title: "5. Limits as data",
    runnable: true,
    intro: "Keep limits in a versioned data file so a limit change is a reviewed data change, not a code edit. The loader must refuse a broken file instead of letting a bad limit reach the line.",
    code: String.raw`import json
import pytest

LIMITS_JSON = """
{
  "version": "2024-03-a",
  "product": "PCBA-1234",
  "limits": {
    "VDD_3V3":  {"low": 3.135, "high": 3.465, "unit": "V"},
    "IDD_IDLE": {"low": 0.05,  "high": 0.40,  "unit": "A"}
  }
}
"""

def load_limits(text):
    data = json.loads(text)
    for field in ("version", "product", "limits"):
        if field not in data:
            raise ValueError(f"missing field: {field}")
    for name, lim in data["limits"].items():
        if lim["low"] > lim["high"]:
            raise ValueError(f"{name}: low > high")
        if not lim.get("unit"):
            raise ValueError(f"{name}: unit required")
    return data

def test_valid_file_loads():
    data = load_limits(LIMITS_JSON)
    assert data["limits"]["VDD_3V3"]["high"] == 3.465

def test_low_above_high_is_rejected():
    bad = LIMITS_JSON.replace('"low": 3.135', '"low": 9.0')
    with pytest.raises(ValueError, match="low > high"):
        load_limits(bad)

def test_missing_unit_is_rejected():
    bad = LIMITS_JSON.replace(',  "unit": "A"', '')
    with pytest.raises(ValueError, match="unit required"):
        load_limits(bad)

def test_missing_version_is_rejected():
    bad = LIMITS_JSON.replace('"version": "2024-03-a",', '')
    with pytest.raises(ValueError, match="missing field: version"):
        load_limits(bad)
`,
  },
  {
    id: "visa",
    title: "6. Real instruments (PyVISA, UART)",
    runnable: false,
    intro: "How the driver layer talks to real hardware: SCPI commands over VISA to a power supply and multimeter, and a serial port to the DUT. Needs the <code>pyvisa</code> and <code>pyserial</code> packages and instruments, so it is read-only here.",
    code: String.raw`import time
import pyvisa
import serial                                    # pyserial

rm = pyvisa.ResourceManager()
psu = rm.open_resource("USB0::0x2A8D::0x0001::MY12345678::INSTR")   # example address
dmm = rm.open_resource("TCPIP0::192.168.10.21::inst0::INSTR")
for inst in (psu, dmm):
    inst.timeout = 5000                          # ms
    inst.read_termination = inst.write_termination = "\n"

print(psu.query("*IDN?"))                        # who am I really talking to?

psu.write("VOLT 12.0")                           # set voltage AND current limit
psu.write("CURR 2.0")                            # BEFORE the output is enabled
psu.write("OUTP ON")
try:
    volts = float(dmm.query("MEAS:VOLT:DC? 10"))
    print("rail =", volts)
finally:
    psu.write("OUTP OFF")                        # leave the DUT safe, even after an error

# Wait for the DUT to boot by watching its console
with serial.Serial("/dev/ttyUSB0", 115200, timeout=1) as uart:
    deadline = time.monotonic() + 30
    while time.monotonic() < deadline:
        line = uart.readline().decode(errors="replace").strip()
        if line.startswith("BOOT OK"):
            break
    else:
        raise TimeoutError("DUT did not boot within 30 s")`,
  },
  {
    id: "station",
    title: "7. Station loop and result record",
    runnable: false,
    intro: "The skeleton of a production station: scan, check routing, run, record, upload, show the verdict. Note <em>local copy first</em>, and that every record carries the software and limits version. Read-only: the helpers are placeholders.",
    code: String.raw`import json
from datetime import datetime, timezone

COLOURS = {"PASS": "green", "FAIL": "red", "ERROR": "yellow"}

def run_station(station, mes):
    while True:
        sn = station.scan_serial()                       # operator scans the barcode
        if not mes.is_allowed(sn, station.id):           # right product, right step?
            station.show("WRONG ROUTE", "red")
            continue

        started = datetime.now(timezone.utc)
        verdict, results = run_sequence(station.dut, STEPS, stop_on_fail=True)

        record = {
            "sn": sn,
            "station": station.id,
            "sw_version": SW_VERSION,                    # which code made this verdict
            "limits_version": LIMITS["version"],         # and which limits
            "started": started.isoformat(),
            "seconds": (datetime.now(timezone.utc) - started).total_seconds(),
            "verdict": verdict,
            "steps": results,                            # name, value, status for every step
        }
        station.log.write(json.dumps(record) + "\n")     # local copy FIRST
        mes.upload(record)                               # queue + retry if the network drops
        station.show(verdict, COLOURS[verdict])`,
  },
  {
    id: "ci",
    title: "8. Release pipeline for tester software",
    runnable: false,
    lang: "yaml",
    intro: "Tester software is a product too. Run the simulator-based tests on every change, and build a checksummed release package from a version tag. That tag is exactly what MFG installs.",
    code: ghaYaml,
  },
  {
    id: "golden",
    title: "9. Golden unit drift & health check",
    runnable: true,
    intro: "Before every shift on the production line, the station runs a <b>golden unit</b> (a known-good certified board) to prove that the tester itself has not drifted or become noisy. If the tester's mean shifts or contact resistance fluctuates, the shift stops <em>before</em> any customer boards are falsely rejected.",
    code: String.raw`import statistics
import pytest

class StationHealthError(Exception):
    """Raised when the tester itself drifts out of calibration."""

def verify_golden_unit(readings, expected_nominal, max_drift_pct=1.0, max_sigma=0.015):
    """Verify tester calibration before starting the shift.
    readings: measurements on the certified golden unit.
    expected_nominal: certified nominal value (e.g. 5.000 V).
    """
    if len(readings) < 5:
        raise ValueError("need at least 5 readings to evaluate station health")
    mean = statistics.mean(readings)
    stdev = statistics.stdev(readings)
    drift_pct = abs(mean - expected_nominal) / expected_nominal * 100.0

    if drift_pct > max_drift_pct:
        raise StationHealthError(f"Tester mean drifted {drift_pct:.2f}% (limit {max_drift_pct}%)")
    if stdev > max_sigma:
        raise StationHealthError(f"Excessive measurement noise: sigma={stdev:.4f} (limit {max_sigma})")
    return {"status": "HEALTHY", "mean": mean, "stdev": stdev, "drift_pct": drift_pct}

def test_healthy_station_at_shift_start():
    readings = [5.001, 5.000, 4.999, 5.002, 5.000, 4.998, 5.001]
    res = verify_golden_unit(readings, expected_nominal=5.000)
    assert res["status"] == "HEALTHY"
    assert res["drift_pct"] < 0.1

def test_catches_dmm_calibration_drift():
    # Tester uncalibrated or probe oxidized: shifts by 80 mV on 5V (> 1.5%)
    drifted = [5.080, 5.082, 5.081, 5.079, 5.080]
    with pytest.raises(StationHealthError, match="Tester mean drifted"):
        verify_golden_unit(drifted, expected_nominal=5.000, max_drift_pct=1.0)

def test_catches_noisy_worn_pogo_pins():
    # Pogo pins worn out: excessive contact resistance variance
    noisy = [5.00, 5.05, 4.92, 5.08, 4.90, 5.03]
    with pytest.raises(StationHealthError, match="Excessive measurement noise"):
        verify_golden_unit(noisy, expected_nominal=5.000, max_sigma=0.015)
`,
  },
  {
    id: "redfish",
    title: "10. Rack telemetry via the BMC (Redfish)",
    runnable: true,
    intro: "Every node in an OCP rack has a BMC that reports its sensors over Redfish (JSON over HTTPS). A TDE reads them to prove fans, temperatures and coolant temperatures are healthy. Here the JSON is already loaded into a dict, in the shape of a Redfish <code>Thermal</code> resource (newer firmware may expose the same data under <code>ThermalSubsystem</code>). The rule that matters: <b>a missing reading is a problem, never a pass</b>.",
    code: String.raw`import copy

THERMAL = {
    "Temperatures": [
        {"Name": "CPU1 Temp",      "ReadingCelsius": 62, "UpperThresholdCritical": 95},
        {"Name": "Coolant Supply", "ReadingCelsius": 31, "UpperThresholdCritical": 45},
        {"Name": "Coolant Return", "ReadingCelsius": 40, "UpperThresholdCritical": 45},
    ],
    "Fans": [
        {"Name": "Fan1", "Reading": 8200, "ReadingUnits": "RPM", "LowerThresholdCritical": 2000},
        {"Name": "Fan2", "Reading": 7900, "ReadingUnits": "RPM", "LowerThresholdCritical": 2000},
    ],
}

def thermal_violations(thermal, margin_c=2):
    """List readable problems. An empty list means healthy."""
    problems = []
    temps = thermal.get("Temperatures", [])
    fans = thermal.get("Fans", [])
    if not temps and not fans:
        return ["no sensors reported"]          # nothing tested must not pass
    for t in temps:
        reading = t.get("ReadingCelsius")
        if reading is None:
            problems.append(f"{t['Name']}: no reading")
        elif reading >= t["UpperThresholdCritical"] - margin_c:
            problems.append(f"{t['Name']}: {reading} C is within {margin_c} C of the critical limit")
    for f in fans:
        reading = f.get("Reading")
        if reading is None:
            problems.append(f"{f['Name']}: no reading")
        elif reading < f["LowerThresholdCritical"]:
            problems.append(f"{f['Name']}: {reading} {f['ReadingUnits']} is below the minimum")
    return problems

def test_healthy_node_has_no_problems():
    assert thermal_violations(THERMAL) == []

def test_flags_a_stopped_fan():
    t = copy.deepcopy(THERMAL)
    t["Fans"][1]["Reading"] = 0
    assert thermal_violations(t) == ["Fan2: 0 RPM is below the minimum"]

def test_flags_coolant_return_near_its_limit():
    t = copy.deepcopy(THERMAL)
    t["Temperatures"][2]["ReadingCelsius"] = 44
    problems = thermal_violations(t)
    assert len(problems) == 1 and problems[0].startswith("Coolant Return")

def test_a_missing_reading_is_a_problem_not_a_pass():
    t = copy.deepcopy(THERMAL)
    t["Temperatures"][0]["ReadingCelsius"] = None
    assert thermal_violations(t) == ["CPU1 Temp: no reading"]

def test_an_empty_resource_is_not_healthy():
    assert thermal_violations({}) == ["no sensors reported"]
`,
  },
  {
    id: "liquidseq",
    title: "11. Liquid test sequence for a rack",
    runnable: false,
    intro: "The <em>order</em> of a liquid test matters: never apply heat before the loop is full, purged and leak-tight, and always leave the rig safe. This skeleton uses the ideas from exercises 9 and 10 (<code>evaluate_leak_test</code>, <code>heat_load_kw</code>). Read-only: the <code>rig</code> and <code>spec</code> objects are placeholders, and every number comes from the program's test specification.",
    code: String.raw`def liquid_test(rig, rack, spec):
    """Return (verdict, results). Order matters."""
    results = {}
    rig.connect(rack)                                  # QDs mated, rack locked in, presence sensed
    try:
        # 1. Fill and purge: no heat until the loop is full of liquid, not air
        rig.fill(spec.fill_pressure_kpa)
        rig.purge_air(timeout_s=spec.purge_timeout_s)

        # 2. Leak test (pressure decay). ERROR means "not pressurised", so the rack is not judged
        rig.pressurize(spec.test_pressure_kpa)
        samples = rig.hold_and_sample(spec.hold_s)     # list of (seconds, kPa)
        leak = evaluate_leak_test(samples, spec.min_start_kpa, spec.max_drop_kpa)
        results["leak"] = leak
        if leak["verdict"] != "PASS":
            return leak["verdict"], results            # stop: no point heating a leaking rack

        # 3. Circulate and check the hydraulics
        rig.circulate(spec.flow_lpm)
        flow, dp = rig.read_flow_lpm(), rig.read_dp_kpa()
        results["hydraulics"] = {"flow_lpm": flow, "dp_kpa": dp}
        if not (spec.flow_min <= flow <= spec.flow_max and dp <= spec.dp_max_kpa):
            return "FAIL", results

        # 4. Thermal soak with a known load, then check the heat balance
        rig.apply_load(spec.load_kw)
        rig.wait_until_stable(timeout_s=spec.soak_timeout_s)
        measured = heat_load_kw(rig.read_flow_lpm(), rig.read_t_in_c(), rig.read_t_out_c(), spec.fluid)
        results["heat_balance"] = {"applied_kw": spec.load_kw, "measured_kw": measured}
        if not heat_balance_ok(spec.load_kw, measured, spec.balance_tol_pct):
            return "FAIL", results

        # 5. Prove the protections: stop the flow and expect an alarm and a safe reaction
        rig.inject_flow_loss()
        results["flow_loss_alarm"] = rig.alarm_raised(within_s=spec.alarm_s)
        return ("PASS" if results["flow_loss_alarm"] else "FAIL"), results
    except Exception:
        return "ERROR", results                        # a rig problem is not a verdict on the rack
    finally:
        rig.stop_load()                                # always leave the rig safe
        rig.depressurize()
        if spec.ship_dry:
            rig.drain_and_dry()`,
  },
  {
    id: "provision",
    title: "12. Provisioning: serial numbers and MACs",
    runnable: true,
    intro: "Production programming writes <b>identity</b> into each unit: a serial number and MAC addresses. Two rules matter. A typo must be detectable (a <b>check digit</b>), and the same MAC must never be given to two units. The OUI below is a made-up locally administered example. Use the one your company is assigned.",
    code: String.raw`import pytest

OUI = "02:11:22"   # example only (locally administered), use your assigned OUI

def mac_from_index(oui, index):
    """OUI + a 24-bit device number, for example index 255 -> 02:11:22:00:00:FF"""
    if not 0 <= index < 2**24:
        raise ValueError("index out of range")
    tail = f"{index:06X}"
    return f"{oui}:{tail[0:2]}:{tail[2:4]}:{tail[4:6]}"

def check_digit(digits):
    """Weighted mod-10 digit: weight 3 for the last digit, 1 for the next, and so on."""
    total = sum(int(d) * (3 if i % 2 == 0 else 1) for i, d in enumerate(reversed(digits)))
    return (10 - total % 10) % 10

def make_serial(prefix, number):
    body = f"{number:08d}"
    return f"{prefix}{body}{check_digit(body)}"

def is_valid_serial(sn, prefix):
    if not sn.startswith(prefix) or len(sn) != len(prefix) + 9:
        return False
    body, check = sn[len(prefix):-1], sn[-1]
    return body.isdigit() and check.isdigit() and int(check) == check_digit(body)

def find_duplicates(values):
    seen, dup = set(), []
    for v in values:
        if v in seen and v not in dup:
            dup.append(v)
        seen.add(v)
    return dup

def test_mac_is_formatted_from_the_index():
    assert mac_from_index(OUI, 0) == "02:11:22:00:00:00"
    assert mac_from_index(OUI, 255) == "02:11:22:00:00:FF"

def test_mac_index_must_fit_in_24_bits():
    with pytest.raises(ValueError):
        mac_from_index(OUI, 2**24)

def test_serial_carries_a_check_digit():
    assert make_serial("SN", 1) == "SN000000017"

def test_valid_serial_is_accepted():
    assert is_valid_serial(make_serial("SN", 12345678), "SN")

def test_every_single_digit_typo_is_caught():
    sn = make_serial("SN", 12345678)
    for pos in range(2, len(sn)):                      # every digit after the prefix
        wrong = str((int(sn[pos]) + 1) % 10)
        assert not is_valid_serial(sn[:pos] + wrong + sn[pos + 1:], "SN")

def test_wrong_prefix_is_rejected():
    assert not is_valid_serial(make_serial("SN", 5), "XX")

def test_overlapping_ranges_produce_duplicate_macs():
    batch_a = [mac_from_index(OUI, i) for i in range(0, 5)]
    batch_b = [mac_from_index(OUI, i) for i in range(4, 8)]     # starts one too early
    assert find_duplicates(batch_a + batch_b) == ["02:11:22:00:00:04"]
`,
  },
];

/* ----------------------------------------------------------------- exercises */
TDE.EXERCISES = [
  /* ---------------------------------------------------------------------- 1 */
  {
    id: "check-limit",
    level: "Easy",
    kind: "implement",
    title: "Limit checker",
    summary: "The comparison at the end of every test step.",
    brief: `<p>Implement <code>check_limit(value, low=None, high=None)</code> returning <code>"PASS"</code> or <code>"FAIL"</code>.</p>
      <ul>
        <li>Limits are <b>inclusive</b>: a value equal to a limit passes.</li>
        <li><code>None</code> means "no limit on that side", so one-sided limits work.</li>
        <li><code>nan</code> and infinite values return <code>"FAIL"</code>. A broken measurement must never pass.</li>
        <li>A value that is not a number (for example <code>None</code> or a string) raises <code>TypeError</code>.</li>
        <li>Both limits <code>None</code>, or <code>low &gt; high</code>, raises <code>ValueError</code> (a bad limits file).</li>
      </ul>`,
    starter: String.raw`def check_limit(value, low=None, high=None):
    raise NotImplementedError
`,
    hints: [
      "Validate the limits first (both None, or low > high), then the type of the value, then compute the verdict.",
      "<code>math.isnan(x)</code> and <code>math.isinf(x)</code> detect the broken-measurement cases. Return FAIL for them before comparing.",
      "<code>isinstance(value, (int, float))</code> checks the type. Compare with <code>&lt;</code> and <code>&gt;</code>, so equality passes.",
    ],
    solution: String.raw`import math

def check_limit(value, low=None, high=None):
    if low is None and high is None:
        raise ValueError("at least one limit is required")
    if low is not None and high is not None and low > high:
        raise ValueError("low limit is above high limit")
    if not isinstance(value, (int, float)):
        raise TypeError("value must be a number")
    if math.isnan(value) or math.isinf(value):
        return "FAIL"
    if low is not None and value < low:
        return "FAIL"
    if high is not None and value > high:
        return "FAIL"
    return "PASS"
`,
    tests: String.raw`import pytest

def test_inside_limits_passes():
    assert check_limit(3.3, 3.135, 3.465) == "PASS"

def test_edges_are_inclusive():
    assert check_limit(3.135, 3.135, 3.465) == "PASS"
    assert check_limit(3.465, 3.135, 3.465) == "PASS"

def test_outside_limits_fails():
    assert check_limit(3.134, 3.135, 3.465) == "FAIL"
    assert check_limit(3.466, 3.135, 3.465) == "FAIL"

def test_one_sided_limits():
    assert check_limit(5, low=1) == "PASS"
    assert check_limit(0, low=1) == "FAIL"
    assert check_limit(5, high=10) == "PASS"
    assert check_limit(11, high=10) == "FAIL"

def test_integers_work():
    assert check_limit(5, 0, 10) == "PASS"

def test_nan_and_infinity_never_pass():
    assert check_limit(float("nan"), 0, 10) == "FAIL"
    assert check_limit(float("inf"), low=0) == "FAIL"
    assert check_limit(float("-inf"), high=0) == "FAIL"

@pytest.mark.parametrize("bad", [None, "3.3", [3.3]])
def test_non_numbers_raise_type_error(bad):
    with pytest.raises(TypeError):
        check_limit(bad, 0, 10)

def test_no_limits_is_an_error():
    with pytest.raises(ValueError):
        check_limit(1)

def test_inverted_limits_are_an_error():
    with pytest.raises(ValueError):
        check_limit(1, 5, 3)
`,
  },

  /* ---------------------------------------------------------------------- 2 */
  {
    id: "rail-bugs",
    level: "Easy",
    kind: "tests",
    title: "Hunt the bugs: rail verdict with guardband",
    summary: "Four boundaries, seven hidden bugs.",
    brief: `<p>You are <b>not</b> implementing anything. <code>judge_rail(mv)</code> already exists in several versions: one correct, the others with a hidden bug. Write <code>test_*</code> functions that <b>pass on the correct version and fail on every buggy one</b>. This is how you measure how good your tests are.</p>
      <p>A 3.3 V rail is read in <b>integer millivolts</b>. The spec is &plusmn;5% (3135 to 3465 mV), and a 15 mV <i>guardband</i> inside each limit marks readings that pass but are too close to the edge to trust.</p>
      <table class="spec"><tr><th>Reading (mV)</th><th>Verdict</th></tr>
        <tr><td>below 3135, or above 3465</td><td>"FAIL"</td></tr>
        <tr><td>3135 to 3149, or 3451 to 3465</td><td>"MARGINAL"</td></tr>
        <tr><td>3150 to 3450</td><td>"PASS"</td></tr>
        <tr><td><code>None</code> (no reading)</td><td><code>ValueError</code></td></tr></table>
      <p>You need at least 5 tests.</p>`,
    starter: String.raw`import pytest

# judge_rail(mv) is provided. Do not define it yourself.

def test_nominal_passes():
    assert judge_rail(3300) == "PASS"

# Add more tests. Where are the boundaries? Test ON each one and 1 mV either side.
`,
    hints: [
      "There are four thresholds: 3135, 3150, 3450 and 3465. Bugs hide where a <code>&lt;</code> should be <code>&le;</code> (or the reverse).",
      "For each threshold test the value on it and the value just past it, for example 3134, 3135, 3149, 3150.",
      "Do not forget the upper side (3450, 3451, 3465, 3466) and the <code>None</code> case with <code>pytest.raises(ValueError)</code>.",
      "<code>@pytest.mark.parametrize(\"mv, expected\", [...])</code> turns the boundary table into one compact test.",
    ],
    solution: String.raw`import pytest

@pytest.mark.parametrize("mv, expected", [
    (3134, "FAIL"),
    (3135, "MARGINAL"), (3149, "MARGINAL"),
    (3150, "PASS"), (3300, "PASS"), (3450, "PASS"),
    (3451, "MARGINAL"), (3465, "MARGINAL"),
    (3466, "FAIL"),
])
def test_verdict_at_every_boundary(mv, expected):
    assert judge_rail(mv) == expected

def test_missing_reading_is_an_error():
    with pytest.raises(ValueError):
        judge_rail(None)
`,
    minTests: 5,
    good: String.raw`def judge_rail(mv):
    if mv is None:
        raise ValueError("no reading")
    if mv < 3135 or mv > 3465:
        return "FAIL"
    if mv < 3150 or mv > 3450:
        return "MARGINAL"
    return "PASS"
`,
    mutants: [
      { code: String.raw`def judge_rail(mv):
    if mv is None:
        raise ValueError("no reading")
    if mv <= 3135 or mv > 3465:
        return "FAIL"
    if mv < 3150 or mv > 3450:
        return "MARGINAL"
    return "PASS"
` },
      { code: String.raw`def judge_rail(mv):
    if mv is None:
        raise ValueError("no reading")
    if mv < 3135 or mv >= 3465:
        return "FAIL"
    if mv < 3150 or mv > 3450:
        return "MARGINAL"
    return "PASS"
` },
      { code: String.raw`def judge_rail(mv):
    if mv is None:
        raise ValueError("no reading")
    if mv < 3135 or mv > 3465:
        return "FAIL"
    if mv <= 3150 or mv > 3450:
        return "MARGINAL"
    return "PASS"
` },
      { code: String.raw`def judge_rail(mv):
    if mv is None:
        raise ValueError("no reading")
    if mv < 3135 or mv > 3465:
        return "FAIL"
    if mv < 3150 or mv >= 3450:
        return "MARGINAL"
    return "PASS"
` },
      { code: String.raw`def judge_rail(mv):
    if mv is None:
        raise ValueError("no reading")
    if mv < 3135 or mv > 3465:
        return "FAIL"
    if mv < 3150:
        return "MARGINAL"
    return "PASS"
` },
      { code: String.raw`def judge_rail(mv):
    if mv is None:
        return "FAIL"
    if mv < 3135 or mv > 3465:
        return "FAIL"
    if mv < 3150 or mv > 3450:
        return "MARGINAL"
    return "PASS"
` },
      { code: String.raw`def judge_rail(mv):
    if mv is None:
        raise ValueError("no reading")
    if mv < 3135 or mv > 3456:
        return "FAIL"
    if mv < 3150 or mv > 3450:
        return "MARGINAL"
    return "PASS"
` },
    ],
  },

  /* ---------------------------------------------------------------------- 3 */
  {
    id: "yield",
    level: "Easy",
    kind: "implement",
    title: "Yield from tester logs",
    summary: "First-pass yield, final yield and retest rate.",
    brief: `<p>The tester logs one record per attempt: <code>{"sn": "A1", "attempt": 1, "result": "PASS"}</code> (<code>result</code> is <code>"PASS"</code> or <code>"FAIL"</code>). Records may arrive in any order. A unit is identified by <code>sn</code>. Implement three functions, each returning a fraction between 0 and 1 over <b>units</b>:</p>
      <ul>
        <li><code>first_pass_yield(records)</code>: units whose <b>attempt 1</b> passed (the lowest attempt number).</li>
        <li><code>final_yield(records)</code>: units whose <b>last</b> attempt (highest attempt number) passed.</li>
        <li><code>retest_rate(records)</code>: units tested more than once.</li>
      </ul>
      <p>An empty list raises <code>ValueError</code>.</p>
      <p class="note">First-pass yield is the honest number. A line that "passes" everything on the third retry still has a problem.</p>`,
    starter: String.raw`def first_pass_yield(records):
    raise NotImplementedError

def final_yield(records):
    raise NotImplementedError

def retest_rate(records):
    raise NotImplementedError
`,
    hints: [
      "Group the records by serial number first: a dict of <code>sn -&gt; {attempt: result}</code>. Write one helper that all three functions share.",
      "Use the attempt <em>number</em> (<code>min</code> / <code>max</code> of the keys), not the order of the list.",
      "Divide by the number of units, not the number of records. Raise <code>ValueError</code> in the helper when the list is empty.",
    ],
    solution: String.raw`def _units(records):
    if not records:
        raise ValueError("no records")
    units = {}
    for r in records:
        units.setdefault(r["sn"], {})[r["attempt"]] = r["result"]
    return units

def first_pass_yield(records):
    units = _units(records)
    return sum(1 for a in units.values() if a[min(a)] == "PASS") / len(units)

def final_yield(records):
    units = _units(records)
    return sum(1 for a in units.values() if a[max(a)] == "PASS") / len(units)

def retest_rate(records):
    units = _units(records)
    return sum(1 for a in units.values() if len(a) > 1) / len(units)
`,
    tests: String.raw`import pytest

def rec(sn, attempt, result):
    return {"sn": sn, "attempt": attempt, "result": result}

RECORDS = [
    rec("A", 1, "PASS"),
    rec("B", 1, "FAIL"), rec("B", 2, "PASS"),
    rec("C", 1, "FAIL"), rec("C", 2, "FAIL"),
    rec("D", 1, "PASS"),
]

def test_first_pass_yield():
    assert first_pass_yield(RECORDS) == pytest.approx(0.5)

def test_final_yield():
    assert final_yield(RECORDS) == pytest.approx(0.75)

def test_retest_rate():
    assert retest_rate(RECORDS) == pytest.approx(0.5)

def test_attempt_number_decides_not_list_order():
    recs = [rec("B", 2, "PASS"), rec("B", 1, "FAIL")]
    assert first_pass_yield(recs) == pytest.approx(0.0)
    assert final_yield(recs) == pytest.approx(1.0)

def test_last_attempt_decides_the_final_result():
    recs = [rec("A", 1, "PASS"), rec("A", 2, "FAIL")]
    assert first_pass_yield(recs) == pytest.approx(1.0)
    assert final_yield(recs) == pytest.approx(0.0)

def test_a_single_attempt_is_not_a_retest():
    assert retest_rate([rec("A", 1, "PASS")]) == pytest.approx(0.0)

@pytest.mark.parametrize("fn", [first_pass_yield, final_yield, retest_rate])
def test_empty_input_is_an_error(fn):
    with pytest.raises(ValueError):
        fn([])
`,
  },

  /* ---------------------------------------------------------------------- 4 */
  {
    id: "parse-readings",
    level: "Medium",
    kind: "implement",
    title: "Extract readings from DUT output",
    summary: "Pull NAME = value unit out of noisy console logs.",
    brief: `<p>The DUT console prints readings among other noise, for example <code>[  12.003] adc: VIN=12.1 V IOUT=0.5 A</code>. Implement <code>parse_readings(text)</code> returning a list of <code>{"name", "value", "unit"}</code> in order of appearance.</p>
      <ul>
        <li><b>name</b>: starts with an uppercase letter, then uppercase letters, digits or <code>_</code>. It must not be part of a longer word (<code>xVIN=5</code> is ignored). Lowercase names such as <code>error=3</code> are ignored.</li>
        <li>Spaces around <code>=</code> are optional: <code>TEMP = 40 C</code> and <code>TEMP=40C</code> both work.</li>
        <li><b>value</b>: a signed decimal such as <code>12</code>, <code>-0.25</code>, <code>5.02</code>, returned as a <code>float</code>. Non-numeric values (<code>STATE=ok</code>) are ignored.</li>
        <li><b>unit</b>: optional letters or <code>%</code>, directly after the value or after one space (<code>V</code>, <code>mV</code>, <code>C</code>, <code>%</code>). If there is no unit, use <code>""</code>.
          <b>Careful:</b> in <code>A=1 B=2</code>, <code>B</code> is the next name, not the unit of <code>A</code>.</li>
        <li>Several readings per line and several lines are allowed. Empty text returns <code>[]</code>.</li>
      </ul>`,
    starter: String.raw`import re

def parse_readings(text):
    return []
`,
    hints: [
      "A regular expression with <code>re.finditer</code> over the whole text handles several readings per line for free.",
      "Prevent matching inside longer words with a negative look-behind: <code>(?&lt;![A-Za-z0-9_])</code> before the name.",
      "Make the unit optional, and refuse a unit that is followed by <code>=</code> (it is really the next name): <code>(?:\\s?([A-Za-z%]+)(?![\\w]|\\s*=))?</code>",
      "Value pattern: <code>[-+]?\\d+(?:\\.\\d+)?</code>. Convert with <code>float()</code> and use <code>m[3] or \"\"</code> for a missing unit.",
    ],
    solution: String.raw`import re

READING = re.compile(
    r"(?<![A-Za-z0-9_])([A-Z][A-Z0-9_]*)\s*=\s*([-+]?\d+(?:\.\d+)?)"
    r"(?:\s?([A-Za-z%]+)(?![\w]|\s*=))?"
)

def parse_readings(text):
    return [
        {"name": m[1], "value": float(m[2]), "unit": m[3] or ""}
        for m in READING.finditer(text)
    ]
`,
    tests: String.raw`def test_single_reading():
    assert parse_readings("VBUS_5V = 5.02 V") == [
        {"name": "VBUS_5V", "value": 5.02, "unit": "V"}]

def test_no_spaces_and_no_unit():
    assert parse_readings("STATE_CODE=7") == [
        {"name": "STATE_CODE", "value": 7.0, "unit": ""}]

def test_unit_attached_to_the_value():
    assert parse_readings("TEMP=41.5C") == [
        {"name": "TEMP", "value": 41.5, "unit": "C"}]

def test_negative_value_and_milli_unit():
    assert parse_readings("OFFSET = -0.25 mV") == [
        {"name": "OFFSET", "value": -0.25, "unit": "mV"}]

def test_noise_around_the_reading():
    assert parse_readings("[  12.003] adc: VIN=12.1 V (ok)") == [
        {"name": "VIN", "value": 12.1, "unit": "V"}]

def test_several_readings_on_several_lines():
    text = "VIN=12.1 V IOUT=0.5 A\nTEMP = 40 C"
    assert [(r["name"], r["value"], r["unit"]) for r in parse_readings(text)] == [
        ("VIN", 12.1, "V"), ("IOUT", 0.5, "A"), ("TEMP", 40.0, "C")]

def test_next_name_is_not_mistaken_for_a_unit():
    assert parse_readings("A=1 B=2") == [
        {"name": "A", "value": 1.0, "unit": ""},
        {"name": "B", "value": 2.0, "unit": ""}]

def test_ignores_non_numeric_lowercase_and_embedded_names():
    assert parse_readings("STATE=ok\nerror=3\nxVIN=5") == []

def test_empty_text():
    assert parse_readings("") == []
`,
  },

  /* ---------------------------------------------------------------------- 5 */
  {
    id: "read-stable",
    level: "Medium",
    kind: "implement",
    title: "Wait for a rail to settle",
    summary: "Measure only when the reading is stable. Fake clock included.",
    brief: `<p>After power-on a rail ramps and rings before it settles. Measuring too early gives false fails and a fixed <code>sleep(2)</code> wastes line time. Implement
      <code>read_stable(read, n=3, tol=0.01, timeout=2.0, interval=0.1, clock=time.monotonic, sleep=time.sleep)</code>:</p>
      <ul>
        <li>Call <code>read()</code> to get a reading and keep the last <code>n</code> readings.</li>
        <li>When you have <code>n</code> readings and <code>max - min &lt;= tol</code> (inclusive), return their <b>mean</b>.</li>
        <li>Otherwise, if <code>clock()</code> has reached the deadline (<code>start + timeout</code>), raise <code>TimeoutError("did not settle within {timeout}s")</code>; else <code>sleep(interval)</code> and read again.</li>
        <li>Errors from <code>read()</code> propagate.</li>
      </ul>
      <p class="note"><code>clock</code> and <code>sleep</code> are injectable, so tests run instantly with a fake clock and a scripted list of readings.</p>`,
    starter: String.raw`import time

def read_stable(read, n=3, tol=0.01, timeout=2.0, interval=0.1,
                clock=time.monotonic, sleep=time.sleep):
    raise NotImplementedError
`,
    hints: [
      "Compute <code>deadline = clock() + timeout</code> once, before the loop.",
      "Keep a list <code>window</code>. After each read do <code>window = window[-n:]</code> so old, unstable values drop out.",
      "Order inside the loop: read, check stability, check the deadline, sleep. The stability check comes before the deadline check.",
    ],
    solution: String.raw`import time

def read_stable(read, n=3, tol=0.01, timeout=2.0, interval=0.1,
                clock=time.monotonic, sleep=time.sleep):
    deadline = clock() + timeout
    window = []
    while True:
        window.append(read())
        window = window[-n:]
        if len(window) == n and max(window) - min(window) <= tol:
            return sum(window) / n
        if clock() >= deadline:
            raise TimeoutError(f"did not settle within {timeout}s")
        sleep(interval)
`,
    tests: String.raw`import pytest

class FakeClock:
    def __init__(self):
        self.t = 0.0
        self.sleeps = []
    def now(self):
        return self.t
    def sleep(self, seconds):
        self.sleeps.append(seconds)
        self.t += seconds

def feed(values):
    it = iter(values)
    calls = {"n": 0}
    def read():
        calls["n"] += 1
        return next(it)
    read.calls = calls
    return read

def test_returns_the_mean_of_a_stable_window():
    c = FakeClock()
    read = feed([3.30, 3.32, 3.31])
    value = read_stable(read, n=3, tol=0.05, clock=c.now, sleep=c.sleep)
    assert value == pytest.approx(3.31)
    assert read.calls["n"] == 3
    assert len(c.sleeps) == 2

def test_waits_for_a_ramp_to_settle():
    c = FakeClock()
    read = feed([0.0, 2.0, 3.28, 3.30, 3.31, 3.30])
    value = read_stable(read, n=3, tol=0.05, interval=0.1, clock=c.now, sleep=c.sleep)
    assert value == pytest.approx((3.28 + 3.30 + 3.31) / 3)
    assert read.calls["n"] == 5

def test_old_unstable_readings_leave_the_window():
    c = FakeClock()
    read = feed([10.0, 3.3, 3.3, 3.3])
    value = read_stable(read, n=3, tol=0.05, clock=c.now, sleep=c.sleep)
    assert value == pytest.approx(3.3)
    assert read.calls["n"] == 4

def test_tolerance_is_inclusive():
    c = FakeClock()
    value = read_stable(feed([1.0, 1.5, 1.0]), n=3, tol=0.5, clock=c.now, sleep=c.sleep)
    assert value == pytest.approx(3.5 / 3)

def test_times_out_when_it_never_settles():
    c = FakeClock()
    state = {"x": 0.0}
    def drifting():
        state["x"] += 1.0
        return state["x"]
    with pytest.raises(TimeoutError, match="did not settle"):
        read_stable(drifting, n=3, tol=0.05, timeout=1.0, interval=0.1,
                    clock=c.now, sleep=c.sleep)
    assert c.t >= 1.0

def test_read_errors_propagate():
    c = FakeClock()
    def broken():
        raise RuntimeError("VISA timeout")
    with pytest.raises(RuntimeError):
        read_stable(broken, clock=c.now, sleep=c.sleep)
`,
  },

  /* ---------------------------------------------------------------------- 6 */
  {
    id: "verdict-bugs",
    level: "Medium",
    kind: "tests",
    title: "Hunt the bugs: unit verdict",
    summary: "A tester fault must never look like a pass, or like a bad unit.",
    brief: `<p>Same game, higher stakes. <code>final_verdict(statuses)</code> turns the status of every test step into one verdict for the unit. A wrong verdict either ships a bad unit or scraps a good one. Write tests that pass on the correct version and fail on <b>all seven</b> buggy ones.</p>
      <p><b>Statuses:</b> <code>"PASS"</code>, <code>"FAIL"</code> (unit is bad), <code>"ERROR"</code> (tester or process fault, so the unit has <em>not</em> been judged) and <code>"SKIP"</code> (step not run).</p>
      <ol>
        <li>Any status outside these four raises <code>ValueError</code>.</li>
        <li>Any <code>"ERROR"</code> gives <code>"ERROR"</code> (even if there is also a FAIL, and wherever it appears in the list).</li>
        <li>Otherwise any <code>"FAIL"</code> gives <code>"FAIL"</code>.</li>
        <li>Otherwise, if at least one step is <code>"PASS"</code>, the result is <code>"PASS"</code>. Skipped steps do not prevent a pass.</li>
        <li>Otherwise (empty list, or only skips; nothing was actually checked) the result is <code>"ERROR"</code>. <b>Nothing tested must never pass.</b></li>
      </ol>
      <p>You need at least 6 tests (parametrized rows count individually).</p>`,
    starter: String.raw`import pytest

# final_verdict(statuses) is provided. Do not define it yourself.

def test_all_pass():
    assert final_verdict(["PASS", "PASS"]) == "PASS"

# Add more tests: each rule above, and the order of the statuses.
`,
    hints: [
      "Test the empty list and a list of only SKIPs. Both must be ERROR.",
      "Priority matters: put ERROR and FAIL in the list in both orders, <code>[\"ERROR\", \"FAIL\"]</code> and <code>[\"FAIL\", \"ERROR\"]</code>, and with ERROR first or last.",
      "A SKIP next to a PASS must still be PASS: <code>[\"PASS\", \"SKIP\"]</code>.",
      "<code>pytest.raises(ValueError)</code> for a status such as <code>\"BOGUS\"</code>, in a list that otherwise looks fine.",
    ],
    solution: String.raw`import pytest

@pytest.mark.parametrize("statuses, expected", [
    (["PASS", "PASS"], "PASS"),
    (["PASS", "SKIP"], "PASS"),          # a skip does not block a pass
    (["PASS", "FAIL"], "FAIL"),
    (["FAIL", "ERROR"], "ERROR"),        # ERROR outranks FAIL ...
    (["ERROR", "FAIL"], "ERROR"),        # ... in either order
    (["ERROR", "PASS"], "ERROR"),        # ... and when it is not last
    ([], "ERROR"),                        # nothing tested is not a pass
    (["SKIP"], "ERROR"),
    (["SKIP", "SKIP"], "ERROR"),
])
def test_verdict_rules(statuses, expected):
    assert final_verdict(statuses) == expected

def test_unknown_status_is_rejected():
    with pytest.raises(ValueError):
        final_verdict(["PASS", "BOGUS"])
`,
    minTests: 6,
    good: String.raw`VALID = {"PASS", "FAIL", "ERROR", "SKIP"}

def final_verdict(statuses):
    for s in statuses:
        if s not in VALID:
            raise ValueError(f"unknown status: {s!r}")
    if "ERROR" in statuses:
        return "ERROR"
    if "FAIL" in statuses:
        return "FAIL"
    if "PASS" in statuses:
        return "PASS"
    return "ERROR"
`,
    mutants: [
      { code: String.raw`VALID = {"PASS", "FAIL", "ERROR", "SKIP"}

def final_verdict(statuses):
    for s in statuses:
        if s not in VALID:
            raise ValueError(f"unknown status: {s!r}")
    if "FAIL" in statuses:
        return "FAIL"
    if "ERROR" in statuses:
        return "ERROR"
    if "PASS" in statuses:
        return "PASS"
    return "ERROR"
` },
      { code: String.raw`VALID = {"PASS", "FAIL", "ERROR", "SKIP"}

def final_verdict(statuses):
    for s in statuses:
        if s not in VALID:
            raise ValueError(f"unknown status: {s!r}")
    if "ERROR" in statuses:
        return "ERROR"
    if "FAIL" in statuses:
        return "FAIL"
    return "PASS"
` },
      { code: String.raw`VALID = {"PASS", "FAIL", "ERROR", "SKIP"}

def final_verdict(statuses):
    for s in statuses:
        if s not in VALID:
            raise ValueError(f"unknown status: {s!r}")
    if "ERROR" in statuses:
        return "ERROR"
    if "FAIL" in statuses or "SKIP" in statuses:
        return "FAIL"
    if "PASS" in statuses:
        return "PASS"
    return "ERROR"
` },
      { code: String.raw`def final_verdict(statuses):
    if "ERROR" in statuses:
        return "ERROR"
    if "FAIL" in statuses:
        return "FAIL"
    if "PASS" in statuses:
        return "PASS"
    return "ERROR"
` },
      { code: String.raw`VALID = {"PASS", "FAIL", "ERROR", "SKIP"}

def final_verdict(statuses):
    for s in statuses:
        if s not in VALID:
            raise ValueError(f"unknown status: {s!r}")
    if statuses and statuses[-1] == "ERROR":
        return "ERROR"
    if "FAIL" in statuses:
        return "FAIL"
    if "PASS" in statuses:
        return "PASS"
    return "ERROR"
` },
      { code: String.raw`VALID = {"PASS", "FAIL", "ERROR", "SKIP"}

def final_verdict(statuses):
    for s in statuses:
        if s not in VALID:
            raise ValueError(f"unknown status: {s!r}")
    if not statuses:
        return "ERROR"
    if "ERROR" in statuses:
        return "ERROR"
    if "FAIL" in statuses:
        return "FAIL"
    return "PASS"
` },
      { code: String.raw`VALID = {"PASS", "FAIL", "ERROR", "SKIP"}

def final_verdict(statuses):
    for s in statuses:
        if s not in VALID:
            raise ValueError(f"unknown status: {s!r}")
    if "ERROR" in statuses:
        return "ERROR"
    if "FAIL" in statuses:
        return "FAIL"
    if statuses and all(s == "PASS" for s in statuses):
        return "PASS"
    return "ERROR"
` },
    ],
  },

  /* ---------------------------------------------------------------------- 7 */
  {
    id: "run-sequence",
    level: "Hard",
    kind: "implement",
    title: "Build a test sequencer",
    summary: "Run steps against limits, tell FAIL from ERROR, always leave the DUT safe.",
    brief: `<p>Build the core of a tester program. Implement <code>run_sequence(dut, steps, stop_on_fail=True)</code> returning <code>(verdict, results)</code>.</p>
      <p>Each step is a dict <code>{"name": str, "measure": callable(dut) -&gt; number, "low": number or None, "high": number or None}</code> (<code>None</code> = no limit on that side).</p>
      <ul>
        <li>Call <code>dut.power_on()</code> first, then run the steps in order. Call <code>dut.power_off()</code> <b>exactly once at the end, no matter what happened</b> (even if power-on or a step raised).</li>
        <li>For each step call <code>measure(dut)</code>. If it returns a value, status is <code>"PASS"</code> when <code>low &lt;= value &lt;= high</code> (inclusive, <code>None</code> side ignored), else <code>"FAIL"</code>. If it <b>raises</b>, status is <code>"ERROR"</code> and the value is <code>None</code>.</li>
        <li>Result entries are <code>{"name", "value", "status"}</code>, in step order.</li>
        <li>With <code>stop_on_fail=True</code>, after the first non-PASS step the remaining steps are <b>not measured</b> and are recorded as <code>"SKIP"</code> with value <code>None</code>.</li>
        <li>Verdict: any ERROR gives <code>"ERROR"</code>; else any FAIL gives <code>"FAIL"</code>; else at least one PASS gives <code>"PASS"</code>; else (nothing ran) <code>"ERROR"</code>.</li>
        <li>If <code>power_on()</code> raises: no steps run, return <code>("ERROR", [])</code>, and <code>power_off()</code> is still called once.</li>
      </ul>`,
    starter: String.raw`def run_sequence(dut, steps, stop_on_fail=True):
    results = []
    # your code here
    return "ERROR", results
`,
    hints: [
      "Wrap everything after the function starts in <code>try: ... finally: dut.power_off()</code>. A <code>return</code> inside the <code>try</code> still runs the <code>finally</code>.",
      "Catch <code>Exception</code> around <code>dut.power_on()</code> and around each <code>measure</code> call separately. They mean different things.",
      "Keep a <code>stop</code> flag. Once it is set, append a SKIP entry and <code>continue</code> without calling <code>measure</code>.",
      "Compute the verdict from the list of statuses with the same rules as the previous exercise.",
    ],
    solution: String.raw`def run_sequence(dut, steps, stop_on_fail=True):
    results = []
    try:
        try:
            dut.power_on()
        except Exception:
            return "ERROR", results

        stop = False
        for step in steps:
            if stop:
                results.append({"name": step["name"], "value": None, "status": "SKIP"})
                continue
            try:
                value = step["measure"](dut)
            except Exception:
                value, status = None, "ERROR"
            else:
                low, high = step.get("low"), step.get("high")
                ok = (low is None or value >= low) and (high is None or value <= high)
                status = "PASS" if ok else "FAIL"
            results.append({"name": step["name"], "value": value, "status": status})
            if status != "PASS" and stop_on_fail:
                stop = True

        statuses = [r["status"] for r in results]
        if "ERROR" in statuses:
            return "ERROR", results
        if "FAIL" in statuses:
            return "FAIL", results
        if "PASS" in statuses:
            return "PASS", results
        return "ERROR", results
    finally:
        dut.power_off()
`,
    tests: String.raw`class FakeDut:
    def __init__(self, fail_power_on=False):
        self.log = []
        self.fail_power_on = fail_power_on
    def power_on(self):
        self.log.append("on")
        if self.fail_power_on:
            raise RuntimeError("relay stuck")
    def power_off(self):
        self.log.append("off")

def step(name, value, low=None, high=None):
    def measure(dut):
        dut.log.append(name)
        if isinstance(value, Exception):
            raise value
        return value
    return {"name": name, "measure": measure, "low": low, "high": high}

def statuses(results):
    return [r["status"] for r in results]

def test_all_pass_and_power_cycle_order():
    dut = FakeDut()
    verdict, results = run_sequence(dut, [step("v33", 3.3, 3.135, 3.465), step("idd", 0.2, 0.05, 0.4)])
    assert verdict == "PASS"
    assert results == [
        {"name": "v33", "value": 3.3, "status": "PASS"},
        {"name": "idd", "value": 0.2, "status": "PASS"},
    ]
    assert dut.log == ["on", "v33", "idd", "off"]

def test_limits_are_inclusive():
    verdict, results = run_sequence(FakeDut(), [step("lo", 1.0, 1.0, 2.0), step("hi", 2.0, 1.0, 2.0)])
    assert verdict == "PASS"

def test_one_sided_limits():
    _, results = run_sequence(FakeDut(), [step("x", 5, low=1), step("y", 5, high=4)], stop_on_fail=False)
    assert statuses(results) == ["PASS", "FAIL"]

def test_fail_stops_the_sequence_and_skips_the_rest():
    dut = FakeDut()
    verdict, results = run_sequence(dut, [step("a", 1, 0, 2), step("b", 9, 0, 2), step("c", 1, 0, 2)])
    assert verdict == "FAIL"
    assert statuses(results) == ["PASS", "FAIL", "SKIP"]
    assert results[2]["value"] is None
    assert "c" not in dut.log

def test_stop_on_fail_false_runs_every_step():
    dut = FakeDut()
    verdict, results = run_sequence(dut, [step("a", 9, 0, 2), step("b", 1, 0, 2)], stop_on_fail=False)
    assert verdict == "FAIL"
    assert statuses(results) == ["FAIL", "PASS"]
    assert dut.log == ["on", "a", "b", "off"]

def test_exception_in_a_step_is_an_error_not_a_fail():
    verdict, results = run_sequence(FakeDut(), [step("a", RuntimeError("timeout")), step("b", 1, 0, 2)])
    assert verdict == "ERROR"
    assert statuses(results) == ["ERROR", "SKIP"]
    assert results[0]["value"] is None

def test_error_outranks_fail():
    verdict, _ = run_sequence(FakeDut(), [step("a", 9, 0, 2), step("b", RuntimeError("x"))], stop_on_fail=False)
    assert verdict == "ERROR"

def test_power_off_is_called_exactly_once_whatever_happens():
    for steps in ([step("a", 1, 0, 2)], [step("a", 9, 0, 2)], [step("a", RuntimeError("x"))]):
        dut = FakeDut()
        run_sequence(dut, steps)
        assert dut.log.count("off") == 1
        assert dut.log[-1] == "off"

def test_power_on_failure_runs_nothing_but_still_powers_off():
    dut = FakeDut(fail_power_on=True)
    verdict, results = run_sequence(dut, [step("a", 1, 0, 2)])
    assert verdict == "ERROR"
    assert results == []
    assert dut.log == ["on", "off"]

def test_an_empty_sequence_is_an_error_not_a_pass():
    dut = FakeDut()
    verdict, results = run_sequence(dut, [])
    assert verdict == "ERROR"
    assert results == []
    assert dut.log == ["on", "off"]
`,
  },
  /* ---------------------------------------------------------------------- 8 */
  {
    id: "cpk-eval",
    level: "Medium",
    kind: "implement",
    title: "Process capability (Cpk)",
    summary: "Evaluate whether a production rail is centered and capable.",
    brief: `<p>Implement <code>calc_cpk(readings, lsl=None, usl=None, target_cpk=1.33)</code> returning sample statistics and a capability verdict.</p>
      <ul>
        <li><code>readings</code> is a list of numeric measurements (at least 2 required, else raise <code>ValueError</code>).</li>
        <li>At least one of <code>lsl</code> or <code>usl</code> must be given, and <code>lsl &lt; usl</code> if both exist, else raise <code>ValueError</code>.</li>
        <li>Non-numeric readings raise <code>TypeError</code>. Any <code>nan</code> or infinite reading raises <code>ValueError</code>.</li>
        <li>Calculate sample mean and sample standard deviation (using $N-1$ divisor).</li>
        <li>If standard deviation is <code>0</code>: if mean is within limits return <code>cpk = float("inf")</code>, else <code>0.0</code>.</li>
        <li>For two-sided limits: <code>cpk = min(usl - mean, mean - lsl) / (3.0 * stdev)</code>.</li>
        <li>For one-sided limits: <code>(usl - mean) / (3.0 * stdev)</code> if only USL, or <code>(mean - lsl) / (3.0 * stdev)</code> if only LSL.</li>
        <li>Return <code>{"mean": mean, "stdev": stdev, "cpk": cpk, "capable": cpk &gt;= target_cpk}</code>.</li>
      </ul>`,
    starter: String.raw`def calc_cpk(readings, lsl=None, usl=None, target_cpk=1.33):
    raise NotImplementedError
`,
    hints: [
      "Validate the arguments first: length of readings, limits existence and order, and value types.",
      "Use <code>statistics.mean</code> and <code>statistics.stdev</code> from the standard library for sample statistics.",
      "Check the <code>sd == 0</code> special case before dividing by zero.",
    ],
    solution: String.raw`import math
import statistics

def calc_cpk(readings, lsl=None, usl=None, target_cpk=1.33):
    if len(readings) < 2:
        raise ValueError("at least 2 readings required")
    if lsl is None and usl is None:
        raise ValueError("at least one limit required")
    if lsl is not None and usl is not None and lsl >= usl:
        raise ValueError("lsl must be less than usl")

    clean = []
    for r in readings:
        if not isinstance(r, (int, float)):
            raise TypeError("readings must be numbers")
        if math.isnan(r) or math.isinf(r):
            raise ValueError("invalid reading: nan or inf")
        clean.append(float(r))

    mean = statistics.mean(clean)
    sd = statistics.stdev(clean)

    if sd == 0:
        within = (lsl is None or mean >= lsl) and (usl is None or mean <= usl)
        cpk = float("inf") if within else 0.0
    else:
        if lsl is not None and usl is not None:
            cpk = min(usl - mean, mean - lsl) / (3.0 * sd)
        elif usl is not None:
            cpk = (usl - mean) / (3.0 * sd)
        else:
            cpk = (mean - lsl) / (3.0 * sd)

    return {
        "mean": mean,
        "stdev": sd,
        "cpk": cpk,
        "capable": cpk >= target_cpk,
    }
`,
    tests: String.raw`import pytest

def test_centred_and_capable():
    readings = [3.29, 3.30, 3.31, 3.30, 3.30]
    res = calc_cpk(readings, lsl=3.135, usl=3.465, target_cpk=1.33)
    assert res["mean"] == pytest.approx(3.30)
    assert res["stdev"] == pytest.approx(0.007071, rel=1e-3)
    assert res["cpk"] > 1.33
    assert res["capable"] is True

def test_off_centre_not_capable():
    readings = [3.44, 3.45, 3.46]
    res = calc_cpk(readings, lsl=3.135, usl=3.465, target_cpk=1.33)
    assert res["mean"] == pytest.approx(3.45)
    assert res["capable"] is False
    assert res["cpk"] < 1.33

def test_one_sided_limit():
    readings = [0.1, 0.12, 0.11, 0.09]
    res = calc_cpk(readings, usl=0.5, target_cpk=1.33)
    assert res["capable"] is True
    assert res["cpk"] > 2.0

def test_zero_stdev_within_limits():
    readings = [3.3, 3.3, 3.3]
    res = calc_cpk(readings, lsl=3.135, usl=3.465)
    assert res["cpk"] == float("inf")
    assert res["capable"] is True

def test_invalid_arguments_raise():
    with pytest.raises(ValueError):
        calc_cpk([3.3], lsl=3.0, usl=4.0)
    with pytest.raises(ValueError):
        calc_cpk([3.3, 3.4], lsl=None, usl=None)
    with pytest.raises(ValueError):
        calc_cpk([3.3, 3.4], lsl=5.0, usl=3.0)
    with pytest.raises(TypeError):
        calc_cpk([3.3, "bad"], lsl=1.0, usl=5.0)
    with pytest.raises(ValueError):
        calc_cpk([3.3, float("nan")], lsl=3.0, usl=4.0)
`,
  },

  /* ---------------------------------------------------------------------- 9 */
  {
    id: "leak-decay",
    level: "Medium",
    kind: "implement",
    title: "Leak test by pressure decay",
    summary: "Judge a liquid loop from pressure samples. Not pressurised is not a pass.",
    brief: `<p>Before a water-cooled rack gets any heat, its loop is pressurised, sealed and watched. If the pressure falls, liquid is leaking out. Implement <code>evaluate_leak_test(samples, min_start_kpa, max_drop_kpa)</code>. <code>samples</code> is a list of <code>(seconds, kPa)</code> pairs in time order.</p>
      <ul>
        <li>Fewer than 2 samples, or times that do not strictly increase: raise <code>ValueError</code>.</li>
        <li>If the <b>first</b> pressure is below <code>min_start_kpa</code>, the loop was never properly pressurised, so the test is invalid. Return verdict <code>"ERROR"</code> with <code>drop_kpa</code> and <code>rate_kpa_per_min</code> set to <code>None</code>.</li>
        <li>Otherwise <code>drop = first_pressure - last_pressure</code> (only the first and last samples count) and <code>rate = drop / minutes</code> between them.</li>
        <li>Verdict is <code>"PASS"</code> when <code>drop &lt;= max_drop_kpa</code> (inclusive), else <code>"FAIL"</code>. A pressure <em>rise</em> (for example from warming) gives a negative drop and passes.</li>
        <li>Return <code>{"verdict": ..., "drop_kpa": ..., "rate_kpa_per_min": ...}</code>.</li>
      </ul>
      <p class="note">Why ERROR and not FAIL? A rack that was never pressurised has not been shown to leak, and has not been shown to hold either. Do not scrap it, and do not ship it. Fix the rig and test again. Real limits come from the program's test specification.</p>`,
    starter: String.raw`def evaluate_leak_test(samples, min_start_kpa, max_drop_kpa):
    raise NotImplementedError
`,
    hints: [
      "Validate the input first: <code>len(samples) &lt; 2</code>, then check that every time is greater than the previous one with <code>zip(times, times[1:])</code>.",
      "Unpack <code>(t0, p0) = samples[0]</code> and <code>(t1, p1) = samples[-1]</code>. Check <code>p0 &lt; min_start_kpa</code> before computing anything else.",
      "Minutes between the samples are <code>(t1 - t0) / 60</code>. Compare the drop with <code>&lt;=</code> so a drop equal to the limit passes.",
    ],
    solution: String.raw`def evaluate_leak_test(samples, min_start_kpa, max_drop_kpa):
    if len(samples) < 2:
        raise ValueError("need at least two samples")
    times = [t for t, _ in samples]
    if any(b <= a for a, b in zip(times, times[1:])):
        raise ValueError("times must strictly increase")

    (t0, p0), (t1, p1) = samples[0], samples[-1]
    if p0 < min_start_kpa:
        return {"verdict": "ERROR", "drop_kpa": None, "rate_kpa_per_min": None}

    drop = p0 - p1
    rate = drop / ((t1 - t0) / 60)
    verdict = "PASS" if drop <= max_drop_kpa else "FAIL"
    return {"verdict": verdict, "drop_kpa": drop, "rate_kpa_per_min": rate}
`,
    tests: String.raw`import pytest

def test_small_drop_passes():
    r = evaluate_leak_test([(0, 300.0), (60, 299.8), (120, 299.7)], 250, 0.5)
    assert r["verdict"] == "PASS"
    assert r["drop_kpa"] == pytest.approx(0.3)
    assert r["rate_kpa_per_min"] == pytest.approx(0.15)

def test_large_drop_fails():
    r = evaluate_leak_test([(0, 300.0), (600, 298.0)], 250, 0.5)
    assert r["verdict"] == "FAIL"
    assert r["drop_kpa"] == pytest.approx(2.0)
    assert r["rate_kpa_per_min"] == pytest.approx(0.2)

def test_a_drop_equal_to_the_limit_passes():
    assert evaluate_leak_test([(0, 300.0), (60, 299.5)], 250, 0.5)["verdict"] == "PASS"

def test_a_pressure_rise_is_not_a_leak():
    r = evaluate_leak_test([(0, 300.0), (60, 300.4)], 250, 0.5)
    assert r["verdict"] == "PASS"
    assert r["drop_kpa"] == pytest.approx(-0.4)

def test_not_pressurised_is_an_error_not_a_verdict_on_the_rack():
    r = evaluate_leak_test([(0, 100.0), (60, 100.0)], 250, 0.5)
    assert r == {"verdict": "ERROR", "drop_kpa": None, "rate_kpa_per_min": None}

def test_starting_exactly_at_the_minimum_is_a_valid_test():
    assert evaluate_leak_test([(0, 250.0), (60, 250.0)], 250, 0.5)["verdict"] == "PASS"

def test_only_first_and_last_samples_decide():
    r = evaluate_leak_test([(0, 300.0), (30, 290.0), (60, 299.9)], 250, 0.5)
    assert r["verdict"] == "PASS"
    assert r["drop_kpa"] == pytest.approx(0.1)

@pytest.mark.parametrize("samples", [
    [], [(0, 300.0)], [(0, 300.0), (0, 299.0)], [(10, 300.0), (5, 299.0)],
])
def test_bad_sample_lists_are_rejected(samples):
    with pytest.raises(ValueError):
        evaluate_leak_test(samples, 250, 0.5)

def test_invalid_input_is_reported_before_the_pressure_check():
    with pytest.raises(ValueError):
        evaluate_leak_test([(0, 10.0)], 250, 0.5)
`,
  },

  /* --------------------------------------------------------------------- 10 */
  {
    id: "heat-balance",
    level: "Medium",
    kind: "implement",
    title: "Heat balance of a liquid loop",
    summary: "Turn flow and temperatures into kilowatts, and check them against the load.",
    brief: `<p>A water-cooled rack carries heat away at the rate <code>heat = mass flow &times; cp &times; &Delta;T</code>. With flow in litres per minute: <code>kW = (flow_lpm / 60) &times; rho &times; cp &times; &Delta;T</code>. Use these approximate constants (they are in the starter code):</p>
      <table class="spec"><tr><th>Fluid</th><th>rho (kg/L)</th><th>cp (kJ/kg&middot;K)</th></tr>
        <tr><td><code>"water"</code></td><td>0.997</td><td>4.18</td></tr>
        <tr><td><code>"pg25"</code> (25% propylene glycol)</td><td>1.02</td><td>3.85</td></tr></table>
      <p>Implement three functions:</p>
      <ul>
        <li><code>heat_load_kw(flow_lpm, t_in_c, t_out_c, fluid="water")</code>: heat carried away, in kW. <code>ValueError</code> if flow is not positive, the outlet is colder than the inlet, or the fluid is unknown. Equal temperatures give <code>0.0</code>.</li>
        <li><code>required_flow_lpm(power_kw, delta_t_k, fluid="water")</code>: flow needed to carry <code>power_kw</code> at a temperature rise of <code>delta_t_k</code>. <code>ValueError</code> for negative power, non-positive &Delta;T or an unknown fluid. Zero power gives <code>0.0</code>.</li>
        <li><code>heat_balance_ok(applied_kw, measured_kw, tol_pct=10)</code>: <code>True</code> when the measured heat is within <code>tol_pct</code> percent of the applied load (inclusive). <code>ValueError</code> if <code>applied_kw</code> is not positive.</li>
      </ul>
      <p class="note">In production, the applied electrical load and the heat measured in the coolant must roughly agree. If they do not, a sensor is wrong, there is air in the loop, or heat is leaving some other way.</p>`,
    starter: String.raw`FLUIDS = {
    "water": {"rho": 0.997, "cp": 4.18},   # kg/L, kJ/(kg*K), approximate
    "pg25":  {"rho": 1.02,  "cp": 3.85},
}

def heat_load_kw(flow_lpm, t_in_c, t_out_c, fluid="water"):
    raise NotImplementedError

def required_flow_lpm(power_kw, delta_t_k, fluid="water"):
    raise NotImplementedError

def heat_balance_ok(applied_kw, measured_kw, tol_pct=10):
    raise NotImplementedError
`,
    hints: [
      "Look the fluid up first: <code>FLUIDS[fluid]</code> raises <code>KeyError</code>, so catch it or test <code>fluid not in FLUIDS</code> and raise <code>ValueError</code> yourself.",
      "<code>heat_load_kw</code> is <code>flow_lpm / 60 * rho * cp * (t_out - t_in)</code>. <code>required_flow_lpm</code> is the same formula solved for the flow.",
      "For the balance check compute <code>abs(measured - applied) / applied * 100</code> and compare with <code>&lt;=</code>.",
    ],
    solution: String.raw`FLUIDS = {
    "water": {"rho": 0.997, "cp": 4.18},   # kg/L, kJ/(kg*K), approximate
    "pg25":  {"rho": 1.02,  "cp": 3.85},
}

def _props(fluid):
    if fluid not in FLUIDS:
        raise ValueError(f"unknown fluid: {fluid!r}")
    return FLUIDS[fluid]["rho"], FLUIDS[fluid]["cp"]

def heat_load_kw(flow_lpm, t_in_c, t_out_c, fluid="water"):
    rho, cp = _props(fluid)
    if flow_lpm <= 0:
        raise ValueError("flow must be positive")
    if t_out_c < t_in_c:
        raise ValueError("outlet is colder than inlet")
    return flow_lpm / 60 * rho * cp * (t_out_c - t_in_c)

def required_flow_lpm(power_kw, delta_t_k, fluid="water"):
    rho, cp = _props(fluid)
    if power_kw < 0:
        raise ValueError("power must not be negative")
    if delta_t_k <= 0:
        raise ValueError("delta T must be positive")
    return power_kw * 60 / (rho * cp * delta_t_k)

def heat_balance_ok(applied_kw, measured_kw, tol_pct=10):
    if applied_kw <= 0:
        raise ValueError("applied load must be positive")
    return abs(measured_kw - applied_kw) / applied_kw * 100 <= tol_pct
`,
    tests: String.raw`import pytest

def test_heat_load_of_water():
    # 60 L/min = 1 L/s, 10 K rise: 1 * 0.997 * 4.18 * 10
    assert heat_load_kw(60, 30, 40) == pytest.approx(41.6746, rel=1e-4)

def test_heat_load_scales_with_flow_and_delta_t():
    base = heat_load_kw(30, 30, 40)
    assert heat_load_kw(60, 30, 40) == pytest.approx(2 * base)
    assert heat_load_kw(30, 30, 50) == pytest.approx(2 * base)

def test_equal_temperatures_mean_no_heat():
    assert heat_load_kw(30, 35, 35) == 0.0

def test_glycol_carries_less_heat_for_the_same_flow():
    assert heat_load_kw(60, 30, 40, "pg25") < heat_load_kw(60, 30, 40, "water")

def test_required_flow_for_a_30_kw_rack():
    assert required_flow_lpm(30, 10) == pytest.approx(43.19, rel=1e-3)

def test_glycol_needs_more_flow():
    assert required_flow_lpm(30, 10, "pg25") == pytest.approx(45.84, rel=1e-3)
    assert required_flow_lpm(30, 10, "pg25") > required_flow_lpm(30, 10, "water")

def test_zero_power_needs_no_flow():
    assert required_flow_lpm(0, 10) == 0.0

def test_the_two_formulas_agree():
    flow = required_flow_lpm(18, 8)
    assert heat_load_kw(flow, 30, 38) == pytest.approx(18)

@pytest.mark.parametrize("args", [(0, 30, 40), (-5, 30, 40), (30, 40, 30)])
def test_heat_load_rejects_bad_input(args):
    with pytest.raises(ValueError):
        heat_load_kw(*args)

def test_unknown_fluid_is_rejected():
    with pytest.raises(ValueError):
        heat_load_kw(30, 30, 40, "oil")
    with pytest.raises(ValueError):
        required_flow_lpm(30, 10, "oil")

@pytest.mark.parametrize("power, dt", [(-1, 10), (30, 0), (30, -5)])
def test_required_flow_rejects_bad_input(power, dt):
    with pytest.raises(ValueError):
        required_flow_lpm(power, dt)

def test_balance_within_tolerance():
    assert heat_balance_ok(100, 95) is True
    assert heat_balance_ok(100, 105) is True

def test_balance_edge_is_inclusive_and_beyond_fails():
    assert heat_balance_ok(100, 90, 10) is True
    assert heat_balance_ok(100, 89.9, 10) is False

def test_balance_uses_the_tolerance_argument():
    assert heat_balance_ok(100, 97, 2) is False
    assert heat_balance_ok(100, 97, 5) is True

def test_balance_needs_a_positive_applied_load():
    with pytest.raises(ValueError):
        heat_balance_ok(0, 1)
`,
  },

  /* --------------------------------------------------------------------- 11 */
  {
    id: "power-budget",
    level: "Easy",
    kind: "implement",
    title: "Power shelf redundancy and BBU ride-through",
    summary: "Does the rack survive a failed module, and how long can the battery carry it?",
    brief: `<p>An Open Rack power shelf holds several rectifier modules. With <b>N+1</b> redundancy the rack must keep running when one module fails. A battery shelf (BBU) bridges short outages. Implement three functions (all numbers in kW, kWh or seconds):</p>
      <ul>
        <li><code>usable_capacity_kw(modules_kw, failed=1)</code>: total capacity that is left when the <code>failed</code> <b>largest</b> modules are lost. <code>ValueError</code> if <code>failed</code> is negative or larger than the number of modules.</li>
        <li><code>redundancy_ok(modules_kw, load_kw, failed=1)</code>: <code>True</code> when the usable capacity is at least the load (equal passes). <code>ValueError</code> if <code>load_kw</code> is negative.</li>
        <li><code>bbu_runtime_s(energy_kwh, load_kw, usable_pct=80)</code>: seconds the battery can carry the load, using only <code>usable_pct</code> percent of its energy. <code>ValueError</code> if energy is negative, load is not positive, or <code>usable_pct</code> is not in the range 0 &lt; pct &le; 100.</li>
      </ul>
      <p class="note">Example: six 5.5 kW modules give 33 kW, but with one lost only 27.5 kW remain. A 30 kW rack is then <em>not</em> protected. The rack needs a seventh module, or a power cap. These are illustration numbers, not a specification.</p>`,
    starter: String.raw`def usable_capacity_kw(modules_kw, failed=1):
    raise NotImplementedError

def redundancy_ok(modules_kw, load_kw, failed=1):
    raise NotImplementedError

def bbu_runtime_s(energy_kwh, load_kw, usable_pct=80):
    raise NotImplementedError
`,
    hints: [
      "Sort the module ratings. Losing the <em>largest</em> ones is the worst case, so keep <code>sorted(modules)[: len(modules) - failed]</code>.",
      "<code>redundancy_ok</code> can call <code>usable_capacity_kw</code> and compare with <code>&gt;=</code>.",
      "Runtime in seconds = <code>energy_kwh * usable_pct / 100 / load_kw * 3600</code>. Validate the inputs first.",
    ],
    solution: String.raw`def usable_capacity_kw(modules_kw, failed=1):
    if failed < 0 or failed > len(modules_kw):
        raise ValueError("failed must be between 0 and the number of modules")
    keep = sorted(modules_kw)[: len(modules_kw) - failed]   # drop the largest ones
    return float(sum(keep))

def redundancy_ok(modules_kw, load_kw, failed=1):
    if load_kw < 0:
        raise ValueError("load must not be negative")
    return usable_capacity_kw(modules_kw, failed) >= load_kw

def bbu_runtime_s(energy_kwh, load_kw, usable_pct=80):
    if energy_kwh < 0:
        raise ValueError("energy must not be negative")
    if load_kw <= 0:
        raise ValueError("load must be positive")
    if not (0 < usable_pct <= 100):
        raise ValueError("usable_pct must be in (0, 100]")
    return energy_kwh * usable_pct / 100 / load_kw * 3600
`,
    tests: String.raw`import pytest

def test_losing_one_of_six_equal_modules():
    assert usable_capacity_kw([5.5] * 6, failed=1) == pytest.approx(27.5)

def test_no_failures_means_full_capacity():
    assert usable_capacity_kw([5.5] * 6, failed=0) == pytest.approx(33.0)

def test_the_largest_modules_are_the_ones_lost():
    assert usable_capacity_kw([3, 5, 5, 7], failed=1) == pytest.approx(13)
    assert usable_capacity_kw([3, 5, 5, 7], failed=2) == pytest.approx(8)

def test_losing_every_module_leaves_nothing():
    assert usable_capacity_kw([4, 4], failed=2) == pytest.approx(0)

@pytest.mark.parametrize("failed", [-1, 3])
def test_bad_failed_count_is_rejected(failed):
    with pytest.raises(ValueError):
        usable_capacity_kw([4, 4], failed=failed)

def test_the_input_list_is_not_modified():
    mods = [7, 3, 5]
    usable_capacity_kw(mods)
    assert mods == [7, 3, 5]

def test_six_modules_do_not_protect_a_30_kw_rack():
    assert redundancy_ok([5.5] * 6, 30) is False

def test_seven_modules_do_protect_it():
    assert redundancy_ok([5.5] * 7, 30) is True

def test_capacity_equal_to_load_passes_and_just_above_fails():
    assert redundancy_ok([5, 5, 5], 10) is True
    assert redundancy_ok([5, 5, 5], 10.01) is False

def test_more_failures_tolerated_when_asked():
    assert redundancy_ok([5] * 6, 15, failed=3) is True
    assert redundancy_ok([5] * 6, 16, failed=3) is False

def test_negative_load_is_rejected():
    with pytest.raises(ValueError):
        redundancy_ok([5, 5], -1)

def test_bbu_runtime_example():
    # 1.25 kWh, 80% usable = 1 kWh, at 30 kW: 2 minutes
    assert bbu_runtime_s(1.25, 30, 80) == pytest.approx(120)

def test_bbu_runtime_with_all_energy_usable():
    assert bbu_runtime_s(2, 10, 100) == pytest.approx(720)

def test_bbu_default_usable_is_80_percent():
    assert bbu_runtime_s(1.25, 30) == pytest.approx(120)

def test_empty_battery_runs_zero_seconds():
    assert bbu_runtime_s(0, 10) == pytest.approx(0)

@pytest.mark.parametrize("args", [(-1, 10), (1, 0), (1, -5), (1, 10, 0), (1, 10, 101)])
def test_bbu_rejects_bad_input(args):
    with pytest.raises(ValueError):
        bbu_runtime_s(*args)
`,
  },

  /* --------------------------------------------------------------------- 12 */
  {
    id: "capacity-cost",
    level: "Medium",
    kind: "implement",
    title: "Testers needed and cost of test",
    summary: "Size a test line and price the test, the way a proposal does.",
    brief: `<p>Every proposal needs two answers: how many stations, and what each tested unit costs. Implement three functions.</p>
      <ul>
        <li><code>testers_needed(demand_per_day, cycle_s, available_s_per_day, retest_rate=0.0, uptime=1.0, units_per_cycle=1)</code>.
          Test seconds needed per day = <code>demand &times; cycle_s &times; (1 + retest_rate) / units_per_cycle</code>. One tester supplies <code>available_s_per_day &times; uptime</code> seconds per day.
          Return the smallest <b>whole number</b> of testers that covers the need (round up, but ignore floating-point noise below 1e-9). Zero demand needs 0 testers.
          <code>ValueError</code> for: negative demand, <code>cycle_s</code> or <code>available_s_per_day</code> not positive, negative retest rate, <code>uptime</code> outside 0 &lt; uptime &le; 1, <code>units_per_cycle</code> below 1.</li>
        <li><code>cost_per_unit(capex, nre, lifetime_units, annual_running_cost, annual_units)</code> = <code>(capex + nre) / lifetime_units + annual_running_cost / annual_units</code>.
          <code>ValueError</code> if <code>lifetime_units</code> or <code>annual_units</code> is not positive, or any cost is negative.</li>
        <li><code>breakeven_units(fixed_cost, saving_per_unit)</code>: units after which a fixed extra cost (for example an ICT fixture) is paid back by a per-unit saving. <code>ValueError</code> if <code>fixed_cost</code> is negative or the saving is not positive.</li>
      </ul>
      <p class="note">Worked example: 1,200 units a day, 180 s per unit, 8% retest, 16 h of line time (57,600 s), 90% uptime needs 1,200 &times; 194.4 s = 233,280 s a day. One tester gives 51,840 s, so 4.5 testers, so <b>5</b>.</p>`,
    starter: String.raw`import math

def testers_needed(demand_per_day, cycle_s, available_s_per_day,
                   retest_rate=0.0, uptime=1.0, units_per_cycle=1):
    raise NotImplementedError

def cost_per_unit(capex, nre, lifetime_units, annual_running_cost, annual_units):
    raise NotImplementedError

def breakeven_units(fixed_cost, saving_per_unit):
    raise NotImplementedError
`,
    hints: [
      "Compute the seconds needed and the seconds one tester supplies, then divide. Use <code>math.ceil(ratio - 1e-9)</code> so an exact fit such as 1.0 does not become 2.",
      "Validate first: each rule in the brief is one <code>if ... raise ValueError</code>. Zero demand should return 0 before dividing anything.",
      "<code>cost_per_unit</code> is two divisions added together. <code>breakeven_units</code> is one division.",
    ],
    solution: String.raw`import math

def testers_needed(demand_per_day, cycle_s, available_s_per_day,
                   retest_rate=0.0, uptime=1.0, units_per_cycle=1):
    if demand_per_day < 0 or cycle_s <= 0 or available_s_per_day <= 0:
        raise ValueError("demand must be >= 0 and times must be positive")
    if retest_rate < 0 or not (0 < uptime <= 1) or units_per_cycle < 1:
        raise ValueError("bad retest rate, uptime or units per cycle")
    if demand_per_day == 0:
        return 0
    needed = demand_per_day * cycle_s * (1 + retest_rate) / units_per_cycle
    per_tester = available_s_per_day * uptime
    return math.ceil(needed / per_tester - 1e-9)

def cost_per_unit(capex, nre, lifetime_units, annual_running_cost, annual_units):
    if lifetime_units <= 0 or annual_units <= 0:
        raise ValueError("volumes must be positive")
    if min(capex, nre, annual_running_cost) < 0:
        raise ValueError("costs must not be negative")
    return (capex + nre) / lifetime_units + annual_running_cost / annual_units

def breakeven_units(fixed_cost, saving_per_unit):
    if fixed_cost < 0 or saving_per_unit <= 0:
        raise ValueError("fixed cost >= 0 and saving > 0 required")
    return fixed_cost / saving_per_unit
`,
    tests: String.raw`import pytest

def test_the_worked_example_needs_five_testers():
    assert testers_needed(1200, 180, 57600, retest_rate=0.08, uptime=0.9) == 5

def test_rounds_up():
    assert testers_needed(100, 36, 3000) == 2        # 3600 / 3000 = 1.2

def test_an_exact_fit_does_not_add_a_tester():
    assert testers_needed(10, 360, 3600) == 1

def test_retests_add_load():
    assert testers_needed(1000, 100, 36000) == 3     # 2.78
    assert testers_needed(1000, 100, 36000, retest_rate=0.5) == 5   # 4.17

def test_uptime_reduces_what_one_tester_supplies():
    assert testers_needed(1200, 180, 57600, uptime=0.5) == 8        # 7.5

def test_a_multi_up_fixture_shares_the_cycle():
    assert testers_needed(1200, 180, 57600, units_per_cycle=2) == 2  # 1.875

def test_no_demand_needs_no_testers():
    assert testers_needed(0, 180, 57600) == 0

@pytest.mark.parametrize("kwargs", [
    {"demand_per_day": -1}, {"cycle_s": 0}, {"available_s_per_day": 0},
    {"retest_rate": -0.1}, {"uptime": 0}, {"uptime": 1.1}, {"units_per_cycle": 0},
])
def test_testers_needed_rejects_bad_input(kwargs):
    args = dict(demand_per_day=100, cycle_s=60, available_s_per_day=3600)
    args.update(kwargs)
    with pytest.raises(ValueError):
        testers_needed(**args)

def test_cost_per_unit_worked_example():
    assert cost_per_unit(1_000_000, 500_000, 300_000, 200_000, 150_000) == pytest.approx(6.3333, rel=1e-4)

def test_cost_with_no_running_cost_is_just_amortisation():
    assert cost_per_unit(100, 50, 30, 0, 10) == pytest.approx(5.0)

def test_a_volume_drop_raises_cost_per_unit():
    base = cost_per_unit(1_000_000, 500_000, 300_000, 200_000, 150_000)
    low = cost_per_unit(1_000_000, 500_000, 240_000, 200_000, 120_000)
    assert low == pytest.approx(base * 1.25)

@pytest.mark.parametrize("args", [
    (1, 1, 0, 1, 1), (1, 1, 1, 1, 0), (-1, 1, 1, 1, 1), (1, -1, 1, 1, 1), (1, 1, 1, -1, 1),
])
def test_cost_per_unit_rejects_bad_input(args):
    with pytest.raises(ValueError):
        cost_per_unit(*args)

def test_breakeven():
    assert breakeven_units(400_000, 8) == pytest.approx(50_000)
    assert breakeven_units(0, 5) == 0

@pytest.mark.parametrize("args", [(-1, 5), (100, 0), (100, -2)])
def test_breakeven_rejects_bad_input(args):
    with pytest.raises(ValueError):
        breakeven_units(*args)
`,
  },

  /* --------------------------------------------------------------------- 13 */
  {
    id: "golden-config",
    level: "Medium",
    kind: "implement",
    title: "Verify a node against its golden configuration",
    summary: "Compare nested hardware and firmware readings with the baseline.",
    brief: `<p>A node must match its golden configuration: firmware versions, DIMM count, link speeds. Implement <code>diff_config(expected, actual, strict=False)</code> where both are (nested) dicts, and return a <b>sorted list of readable differences</b>. An empty list means the node matches.</p>
      <ul>
        <li>Walk <code>expected</code>. Name each value by its path with dots, for example <code>dimm.count</code>.</li>
        <li>Key missing in <code>actual</code>: <code>"nic.speed: missing (expected 100)"</code> (use <code>repr</code> of the expected value).</li>
        <li>Different value: <code>"bios: expected '2.4.1', got '2.3.0'"</code>. Lists and scalars are compared as a whole. If one side is a dict and the other is not, that is a difference too.</li>
        <li>Two dicts: compare them recursively.</li>
        <li>Keys that exist only in <code>actual</code> are <b>ignored</b>, unless <code>strict=True</code>. Then each is reported as <code>"path: unexpected"</code>.</li>
        <li>Return the messages sorted (plain string sort).</li>
      </ul>
      <p class="note">This is the check that stops "wrong firmware shipped", one of the most common escapes. The baseline is stored per SKU in a versioned file, and the test reads the actual values from the BMC.</p>`,
    starter: String.raw`def diff_config(expected, actual, strict=False):
    raise NotImplementedError
`,
    hints: [
      "Write a recursive helper that takes a path prefix, or add a private <code>_prefix</code> argument. Build each path as <code>prefix + key</code> and pass <code>path + '.'</code> down.",
      "Order of checks for each expected key: missing, then both-are-dicts (recurse), then plain inequality.",
      "For <code>strict</code>, loop over <code>actual</code> keys that are not in <code>expected</code> and add <code>f\"{path}: unexpected\"</code>. Finish with <code>sorted(...)</code>.",
    ],
    solution: String.raw`def diff_config(expected, actual, strict=False, _prefix=""):
    diffs = []
    for key, exp in expected.items():
        path = f"{_prefix}{key}"
        if key not in actual:
            diffs.append(f"{path}: missing (expected {exp!r})")
        elif isinstance(exp, dict) and isinstance(actual[key], dict):
            diffs.extend(diff_config(exp, actual[key], strict, path + "."))
        elif exp != actual[key]:
            diffs.append(f"{path}: expected {exp!r}, got {actual[key]!r}")
    if strict:
        for key in actual:
            if key not in expected:
                diffs.append(f"{_prefix}{key}: unexpected")
    return sorted(diffs)
`,
    tests: String.raw`GOLD = {"bios": "2.4.1", "bmc": "1.18", "dimm": {"count": 16, "speed_mts": 4800}}

def test_an_identical_node_has_no_differences():
    assert diff_config(GOLD, dict(GOLD, dimm=dict(GOLD["dimm"]))) == []

def test_wrong_value():
    assert diff_config({"bios": "2.4.1"}, {"bios": "2.3.0"}) == ["bios: expected '2.4.1', got '2.3.0'"]

def test_nested_paths_use_dots():
    actual = {"dimm": {"count": 15, "speed_mts": 4800}}
    assert diff_config({"dimm": {"count": 16, "speed_mts": 4800}}, actual) == ["dimm.count: expected 16, got 15"]

def test_missing_key():
    assert diff_config({"nic": {"speed": 100}}, {"nic": {}}) == ["nic.speed: missing (expected 100)"]

def test_missing_section():
    assert diff_config({"gpu": {"count": 8}}, {}) == ["gpu: missing (expected {'count': 8})"]

def test_lists_are_compared_as_a_whole():
    assert diff_config({"fans": [1, 2, 3]}, {"fans": [1, 2]}) == ["fans: expected [1, 2, 3], got [1, 2]"]

def test_dict_versus_scalar_is_a_difference():
    assert diff_config({"a": {"b": 1}}, {"a": 5}) == ["a: expected {'b': 1}, got 5"]

def test_results_are_sorted():
    out = diff_config({"b": 1, "a": 1}, {"b": 2, "a": 2})
    assert out == ["a: expected 1, got 2", "b: expected 1, got 2"]

def test_extra_keys_are_ignored_by_default():
    assert diff_config({"a": 1}, {"a": 1, "extra": 9}) == []
    assert diff_config({"d": {"x": 1}}, {"d": {"x": 1, "y": 2}}) == []

def test_strict_reports_extra_keys_at_every_level():
    assert diff_config({"a": 1}, {"a": 1, "extra": 9}, strict=True) == ["extra: unexpected"]
    assert diff_config({"d": {"x": 1}}, {"d": {"x": 1, "y": 2}}, strict=True) == ["d.y: unexpected"]

def test_several_problems_are_all_reported():
    actual = {"bios": "2.3.0", "dimm": {"count": 15}}
    out = diff_config(GOLD, actual)
    assert out == [
        "bios: expected '2.4.1', got '2.3.0'",
        "bmc: missing (expected '1.18')",
        "dimm.count: expected 16, got 15",
        "dimm.speed_mts: missing (expected 4800)",
    ]

def test_empty_baseline_matches_anything():
    assert diff_config({}, {"a": 1}) == []
    assert diff_config({}, {"a": 1}, strict=True) == ["a: unexpected"]
`,
  },

  /* --------------------------------------------------------------------- 14 */
  {
    id: "guardband-burnin",
    level: "Medium",
    kind: "implement",
    title: "Guardbands and burn-in time",
    summary: "Tighten limits by the measurement uncertainty, and size a burn-in.",
    brief: `<p>Two calculations a TDE does when a measurement is not perfect and when early failures must be screened out. Implement four functions.</p>
      <ul>
        <li><code>guardbanded_limits(lsl, usl, uncertainty, guard=1.0)</code> returns <code>(test_low, test_high)</code> = <code>(lsl + guard &times; uncertainty, usl &minus; guard &times; uncertainty)</code>. <code>ValueError</code> if <code>lsl &gt;= usl</code>, if <code>uncertainty</code> or <code>guard</code> is negative, or if the guardbanded window is empty (<code>test_low &gt;= test_high</code>).</li>
        <li><code>classify_guardbanded(value, lsl, usl, uncertainty, guard=1.0)</code>: <code>"FAIL"</code> outside the spec limits, <code>"PASS"</code> inside the guardbanded limits (edges included), otherwise <code>"RETEST"</code> (inside the spec but too close to an edge to trust).</li>
        <li><code>acceleration_factor(ea_ev, t_use_c, t_stress_c)</code>, the Arrhenius model: <code>AF = exp( Ea / k &times; (1/T_use &minus; 1/T_stress) )</code>, with temperatures in <b>kelvin</b> (add 273.15) and <code>k = 8.617e-5</code> eV/K. <code>ValueError</code> if <code>ea_ev</code> is not positive, or the stress temperature is not higher than the use temperature.</li>
        <li><code>burnin_hours(use_hours, af)</code>: hours at stress that simulate <code>use_hours</code> of normal use (<code>use_hours / af</code>). <code>ValueError</code> if <code>use_hours</code> is negative or <code>af</code> is not positive.</li>
      </ul>
      <p class="note">Example: Ea = 0.7 eV, use at 55 &deg;C, stress at 85 &deg;C gives AF &asymp; 7.95, so 1,000 hours of use is simulated by about 126 hours at 85 &deg;C. This is a simplified single-mechanism model for training. Real burn-in plans come from reliability data and the component ratings.</p>`,
    starter: String.raw`import math

K_EV = 8.617e-5   # Boltzmann constant in eV/K

def guardbanded_limits(lsl, usl, uncertainty, guard=1.0):
    raise NotImplementedError

def classify_guardbanded(value, lsl, usl, uncertainty, guard=1.0):
    raise NotImplementedError

def acceleration_factor(ea_ev, t_use_c, t_stress_c):
    raise NotImplementedError

def burnin_hours(use_hours, af):
    raise NotImplementedError
`,
    hints: [
      "<code>classify_guardbanded</code> can call <code>guardbanded_limits</code> first (so bad input is rejected the same way), then compare the value with the spec limits and then with the test limits.",
      "Convert to kelvin before taking <code>1/T</code>: <code>t_use_c + 273.15</code>. Then <code>math.exp(ea_ev / K_EV * (1 / t_use_k - 1 / t_stress_k))</code>.",
      "Keep each <code>ValueError</code> check in its own <code>if</code> with a clear message. They are easy to test separately.",
    ],
    solution: String.raw`import math

K_EV = 8.617e-5   # Boltzmann constant in eV/K

def guardbanded_limits(lsl, usl, uncertainty, guard=1.0):
    if lsl >= usl:
        raise ValueError("lsl must be below usl")
    if uncertainty < 0 or guard < 0:
        raise ValueError("uncertainty and guard must not be negative")
    low = lsl + guard * uncertainty
    high = usl - guard * uncertainty
    if low >= high:
        raise ValueError("guardband too wide for this window")
    return low, high

def classify_guardbanded(value, lsl, usl, uncertainty, guard=1.0):
    low, high = guardbanded_limits(lsl, usl, uncertainty, guard)
    if value < lsl or value > usl:
        return "FAIL"
    if low <= value <= high:
        return "PASS"
    return "RETEST"

def acceleration_factor(ea_ev, t_use_c, t_stress_c):
    if ea_ev <= 0:
        raise ValueError("activation energy must be positive")
    if t_stress_c <= t_use_c:
        raise ValueError("stress must be hotter than use")
    use_k, stress_k = t_use_c + 273.15, t_stress_c + 273.15
    return math.exp(ea_ev / K_EV * (1 / use_k - 1 / stress_k))

def burnin_hours(use_hours, af):
    if use_hours < 0 or af <= 0:
        raise ValueError("use_hours must be >= 0 and af must be positive")
    return use_hours / af
`,
    tests: String.raw`import pytest

# integers (millivolts) keep the edge cases exact
LSL, USL, U = 3135, 3465, 10

def test_guardbanded_limits_move_in_by_the_uncertainty():
    assert guardbanded_limits(LSL, USL, U) == (3145, 3455)

def test_guard_factor_scales_the_band():
    assert guardbanded_limits(LSL, USL, U, guard=2) == (3155, 3445)

def test_zero_uncertainty_leaves_the_spec_limits():
    assert guardbanded_limits(LSL, USL, 0) == (3135, 3465)

@pytest.mark.parametrize("args", [(5, 5, 1), (6, 5, 1), (0, 10, -1), (0, 10, 1, -1)])
def test_guardbanded_limits_reject_bad_input(args):
    with pytest.raises(ValueError):
        guardbanded_limits(*args)

def test_a_band_that_eats_the_whole_window_is_rejected():
    with pytest.raises(ValueError):
        guardbanded_limits(0, 10, 5)          # 5 .. 5 is empty
    with pytest.raises(ValueError):
        guardbanded_limits(0, 10, 6)

@pytest.mark.parametrize("value, expected", [
    (3300, "PASS"),
    (3145, "PASS"), (3455, "PASS"),            # on the test limits
    (3144, "RETEST"), (3456, "RETEST"),        # inside spec, too close to the edge
    (3135, "RETEST"), (3465, "RETEST"),        # on the spec limits
    (3134, "FAIL"), (3466, "FAIL"),
])
def test_classification(value, expected):
    assert classify_guardbanded(value, LSL, USL, U) == expected

def test_classification_uses_the_same_validation():
    with pytest.raises(ValueError):
        classify_guardbanded(5, 0, 10, 6)

def test_the_worked_acceleration_factor():
    assert acceleration_factor(0.7, 55, 85) == pytest.approx(7.95, rel=2e-3)

def test_higher_activation_energy_accelerates_more():
    assert acceleration_factor(1.0, 55, 85) > acceleration_factor(0.5, 55, 85)

def test_a_hotter_stress_accelerates_more():
    assert acceleration_factor(0.7, 55, 105) > acceleration_factor(0.7, 55, 85)

@pytest.mark.parametrize("args", [(0.7, 85, 85), (0.7, 85, 55), (0, 55, 85), (-0.1, 55, 85)])
def test_acceleration_factor_rejects_bad_input(args):
    with pytest.raises(ValueError):
        acceleration_factor(*args)

def test_burnin_hours():
    assert burnin_hours(1000, 7.95) == pytest.approx(125.8, rel=1e-3)
    assert burnin_hours(0, 5) == 0

def test_the_two_burnin_functions_work_together():
    af = acceleration_factor(0.7, 55, 85)
    assert burnin_hours(1000, af) == pytest.approx(125.7, rel=5e-3)

@pytest.mark.parametrize("args", [(-1, 5), (100, 0), (100, -2)])
def test_burnin_hours_rejects_bad_input(args):
    with pytest.raises(ValueError):
        burnin_hours(*args)
`,
  },
];

/* ------------------------------------------------------------------ glossary */
/* Each entry: [acronym, stands for, in plain words]. Edit freely. */
TDE.GLOSSARY = [
  {
    id: "company", title: "Company and programs",
    intro: "Business and program terms you hear in meetings and proposals.",
    items: [
      ["CM", "Contract Manufacturing", "The customer designs the product and we manufacture it. The TDE develops test for the customer's design."],
      ["JDM", "Joint Development Manufacturing", "We co-develop the product with the customer, then manufacture it. The TDE joins at the proposal stage."],
      ["EMS", "Electronics Manufacturing Services", "The industry name for companies that build electronics on behalf of others."],
      ["OEM", "Original Equipment Manufacturer", "The brand owner whose product we build. Usually \"the customer\"."],
      ["NPI", "New Product Introduction", "The engineering work and first builds that take a design to mass production. Most of the TDE's work happens here."],
      ["MP", "Mass Production", "The volume phase after NPI. The tester must now run all day, every day."],
      ["RFQ", "Request for Quotation", "The customer asks for price and plan. A proposal answers it."],
      ["SOW", "Statement of Work", "The written scope of what will be delivered and what the customer provides."],
      ["NRE", "Non-Recurring Engineering", "One-time development cost (for example designing the tester), as opposed to cost per unit."],
      ["BOM", "Bill of Materials", "The list of every part in a product or in a tester."],
      ["CAPEX / OPEX", "Capital / Operating expenditure", "One-time spending on equipment versus the running cost of using it. Both go into the cost of test."],
      ["TCO", "Total Cost of Ownership", "Everything a tester costs over its life: purchase, running, maintenance, calibration and the cost of quality."],
      ["ECO / ECN", "Engineering Change Order / Notice", "A controlled change to a design or process. Check what it does to the tester before it reaches the line."],
    ],
  },
  {
    id: "teams", title: "Teams and roles",
    intro: "Who is who in a program.",
    items: [
      ["TDE", "Test Development Engineer", "Designs, builds and delivers the production test solution (hardware and software), then helps sustain it."],
      ["TE", "Test Engineer", "Defines test requirements and coverage and supports testing. The TDE's closest partner."],
      ["HPS", "Hardware Platform Solution", "The team that works on the hardware platform in JDM programs. Co-writes proposals with the TDE."],
      ["MFG", "Manufacturing", "The line and the people who run the tester every day. The TDE's \"customer\" after handover."],
      ["QA / QE", "Quality Assurance / Quality Engineer", "Owns quality systems, audits and customer quality issues."],
      ["ME / PE", "Manufacturing Engineer / Process Engineer", "Owns the line process, such as SMT settings, throughput and yield improvement."],
    ],
  },
  {
    id: "mfg", title: "MFG: the manufacturing line",
    intro: "Terms from the factory floor.",
    items: [
      ["SMT", "Surface Mount Technology", "Placing and soldering components onto the surface of a board."],
      ["PCB", "Printed Circuit Board", "The bare board that carries the components."],
      ["PCBA", "Printed Circuit Board Assembly", "A board with its components soldered on. Often the DUT."],
      ["SPI", "Solder Paste Inspection", "Checks the printed solder paste before parts are placed. Not the SPI bus (see Interfaces)."],
      ["AOI", "Automated Optical Inspection", "Cameras check for missing, skewed or bridged parts after reflow."],
      ["AXI", "Automated X-ray Inspection", "X-ray check of joints you cannot see, such as under a BGA."],
      ["BGA", "Ball Grid Array", "A chip package with solder balls underneath. Hidden joints are hard to probe or inspect."],
      ["EOL", "End of Line", "The last test stage before packing."],
      ["FAI", "First Article Inspection", "A detailed check of the first units of a build against the specification."],
      ["SN", "Serial Number", "The unique ID that ties every test result to one unit."],
      ["UPH", "Units Per Hour", "Line throughput. The tester's test time must not limit it."],
      ["WIP", "Work In Progress", "Units that are on the line but not yet finished."],
      ["SOP", "Standard Operating Procedure", "The written way a task must be done."],
      ["WI", "Work Instruction", "Step-by-step instructions for an operator at a station."],
      ["PM", "Preventive Maintenance", "Scheduled upkeep (calibration, pin replacement) so the tester does not fail unexpectedly."],
      ["RMA", "Return Material Authorization", "The process for a unit that comes back from the customer."],
    ],
  },
  {
    id: "tde", title: "TDE: test and design for test",
    intro: "The core vocabulary of production test.",
    items: [
      ["DUT", "Device Under Test", "The board or product on the tester."],
      ["UUT", "Unit Under Test", "Another name for the DUT."],
      ["DFT", "Design for Test", "Designing the product so it can be tested: test points, access, JTAG, programming headers."],
      ["DFM", "Design for Manufacturing", "Designing the product so it can be built reliably and cheaply."],
      ["ATE", "Automated Test Equipment", "A tester that runs the test automatically, under software control."],
      ["ICT", "In-Circuit Test", "Checks components and connections on the assembled board, usually with a bed-of-nails fixture."],
      ["FPT", "Flying Probe Test", "Like ICT but with moving probes and no fixture. Slower, good for prototypes and NPI."],
      ["FCT", "Functional Test", "Powers the board and checks that it works: rails, clocks, interfaces, boot."],
      ["JTAG", "Joint Test Action Group (IEEE 1149.1)", "Boundary scan: test connections between chips without probing, and program or debug devices."],
      ["BIST", "Built-In Self-Test", "A test that the product runs on itself, started by the tester."],
      ["ESS", "Environmental Stress Screening", "Heat, cold or power cycling to make early-life failures show up in the factory. Burn-in is one form."],
      ["PCOLA / SOQ", "Presence, Correctness, Orientation, Live, Alignment / Shorts, Opens, Quality", "A checklist of defect classes used to judge test coverage."],
      ["TAP", "Test Access Port", "The 4 or 5 pins of the JTAG interface (TCK, TMS, TDI, TDO and optionally TRST)."],
      ["BSDL", "Boundary Scan Description Language", "A file from the chip vendor that describes a device's boundary-scan cells and pins. Needed to generate boundary-scan tests."],
      ["SVF", "Serial Vector Format", "A text format for JTAG operations, often used to program devices through the TAP."],
      ["HALT / HASS", "Highly Accelerated Life Test / Highly Accelerated Stress Screen", "Stress methods that go beyond normal conditions to find design weaknesses (HALT) or screen production units (HASS)."],
      ["AF", "Acceleration Factor", "How many hours of normal use one hour of stress represents in a given model, for example Arrhenius."],
      ["Ea", "Activation energy", "In the Arrhenius model, how strongly a failure mechanism speeds up with temperature. Typically given in eV."],
      ["TUR", "Test Uncertainty Ratio", "Tolerance of what you measure divided by the measurement uncertainty. A common rule of thumb is 4:1 or better."],
      ["NTF", "No Trouble Found", "A unit failed the tester but no fault was found afterwards. A sign of false fails."],
      ["TP", "Test Point", "A pad or pin placed on the board so a probe can reach a net."],
    ],
  },
  {
    id: "quality", title: "Quality and yield",
    intro: "How we judge the tester and the product with numbers.",
    items: [
      ["FPY", "First-Pass Yield", "Share of units that pass on the first attempt."],
      ["RTY", "Rolled Throughput Yield", "FPY of every stage multiplied together."],
      ["FFR", "False-Fail Rate", "Good units that the tester fails."],
      ["DPPM", "Defective Parts Per Million", "How many bad units per million reached the customer."],
      ["DPMO", "Defects Per Million Opportunities", "Defects per million chances for a defect (for example solder joints)."],
      ["GR&R", "Gauge Repeatability and Reproducibility", "How consistent a measurement system is across repeats, testers and operators."],
      ["MSA", "Measurement System Analysis", "The study of whether a measurement system is fit for purpose. GR&R is one part of it."],
      ["SPC", "Statistical Process Control", "Control charts that show when a process or measurement drifts."],
      ["LSL / USL", "Lower / Upper Specification Limit", "The limits the product must meet."],
      ["Cpk", "Process Capability Index", "How many 3-sigma widths fit between the mean and the nearest limit. Many programs ask for 1.33 or more."],
      ["FA", "Failure Analysis", "Finding out exactly why a unit failed."],
      ["RCA", "Root Cause Analysis", "Digging past the symptom to the real cause."],
      ["8D", "Eight Disciplines", "A structured problem-solving report format common in customer quality issues."],
      ["CAPA", "Corrective and Preventive Action", "Fix the problem and stop it happening again."],
    ],
  },
  {
    id: "software", title: "Software",
    intro: "Terms for the test software side.",
    items: [
      ["ISS3", "ISS3 (name as used by the team)", "The test sequencer most JDM programs use. This site teaches sequencer concepts, not ISS3's own features."],
      ["SCPI", "Standard Commands for Programmable Instruments", "Text commands such as MEAS:VOLT:DC? that most instruments understand."],
      ["VISA", "Virtual Instrument Software Architecture", "The software layer used to talk to instruments over USB, LAN or GPIB."],
      ["API", "Application Programming Interface", "The way one program asks another to do something."],
      ["SDK", "Software Development Kit", "Libraries and tools from a vendor for building on their product."],
      ["DLL", "Dynamic-Link Library", "A compiled library (Windows) that LabVIEW or C# programs often call for a vendor's driver."],
      ["GUI / UI", "Graphical User Interface / User Interface", "What the operator sees and clicks."],
      ["CLI", "Command-Line Interface", "Using a program by typing commands."],
      ["IDE", "Integrated Development Environment", "The editor and tools you write code in."],
      ["CI/CD", "Continuous Integration / Continuous Delivery", "Automatically testing and packaging every change."],
      ["TDD", "Test-Driven Development", "Writing the test before the code that satisfies it."],
      ["LabVIEW", "Laboratory Virtual Instrument Engineering Workbench", "A graphical programming environment widely used for test stations."],
      ["JSON", "JavaScript Object Notation", "A text format for structured data, such as limits files and result records."],
      ["YAML", "YAML Ain't Markup Language", "A human-friendly text format for configuration."],
      ["CSV", "Comma-Separated Values", "A simple table in text form."],
      ["XML", "Extensible Markup Language", "A tagged text format used by many test and report tools."],
      ["SQL", "Structured Query Language", "The language for asking a database questions."],
    ],
  },
  {
    id: "hardware", title: "Hardware and instruments",
    intro: "Equipment and components you meet in a tester.",
    items: [
      ["PSU", "Power Supply Unit", "Gives the DUT power, with voltage and current limits."],
      ["DMM", "Digital Multimeter", "Measures voltage, current and resistance."],
      ["SMU", "Source Measure Unit", "Sources a voltage or current and measures the result in one instrument."],
      ["DAQ", "Data Acquisition", "A card or unit that reads many analog and digital signals."],
      ["DSO", "Digital Storage Oscilloscope", "Shows and measures signals over time."],
      ["AWG", "Arbitrary Waveform Generator", "Creates test signals of any shape."],
      ["LCR", "Inductance, Capacitance, Resistance meter", "Measures the value of passive components."],
      ["e-load", "Electronic Load", "Draws a controlled current from a power source to test it under load."],
      ["PLC", "Programmable Logic Controller", "An industrial controller, often used for fixture actuation and interlocks."],
      ["ADC / DAC", "Analog-to-Digital / Digital-to-Analog Converter", "Turns a voltage into a number and back."],
      ["MCU", "Microcontroller Unit", "A small chip with a processor, memory and I/O. Often runs the DUT's firmware."],
      ["FPGA", "Field-Programmable Gate Array", "A chip whose logic is defined by a loaded configuration."],
      ["SoC", "System on Chip", "A single chip with processor, memory and peripherals."],
      ["GPIO", "General-Purpose Input/Output", "A pin the software can set high or low, or read."],
      ["PWM", "Pulse-Width Modulation", "A signal whose on-time ratio carries information or controls power."],
      ["DC / AC", "Direct / Alternating Current", "Steady or oscillating electrical supply and signals."],
      ["HV", "High Voltage", "Needs extra safety measures at the station."],
      ["RF", "Radio Frequency", "Wireless signals; testing needs shielded fixtures and special instruments."],
      ["EMI / EMC", "Electromagnetic Interference / Compatibility", "Unwanted signals that disturb a circuit, and a product's ability to live with them."],
    ],
  },
  {
    id: "interfaces", title: "Interfaces and buses",
    intro: "The ways a tester talks to the DUT and to instruments.",
    items: [
      ["UART", "Universal Asynchronous Receiver-Transmitter", "A serial port. The DUT console usually runs over it."],
      ["RS-232 / RS-485", "Recommended Standard 232 / 485", "Electrical standards for serial links. RS-485 handles longer cables and many devices."],
      ["SPI", "Serial Peripheral Interface", "A fast four-wire chip-to-chip bus. Not Solder Paste Inspection."],
      ["I2C", "Inter-Integrated Circuit", "A two-wire bus for sensors and small memories."],
      ["SWD", "Serial Wire Debug", "A two-pin interface to program and debug ARM chips."],
      ["USB", "Universal Serial Bus", "Common link to instruments and to DUTs."],
      ["PCIe", "Peripheral Component Interconnect Express", "High-speed bus inside servers and many boards."],
      ["CAN", "Controller Area Network", "A robust bus used in vehicles and industrial equipment."],
      ["GPIB", "General Purpose Interface Bus (IEEE 488)", "An older instrument bus that is still found on bench equipment."],
      ["LAN / Ethernet", "Local Area Network", "Network cable link. Many modern instruments are controlled over it."],
    ],
  },
  {
    id: "it", title: "IT and factory systems",
    intro: "The systems around the tester.",
    items: [
      ["MES", "Manufacturing Execution System", "Tracks each unit and its results through the line. The tester reads routing from it and uploads results to it."],
      ["ERP", "Enterprise Resource Planning", "Company-wide system for orders, materials and finance."],
      ["PLM", "Product Lifecycle Management", "Holds design data, documents and revisions."],
      ["IP", "Internet Protocol (address)", "The network address of a station or instrument."],
      ["DHCP", "Dynamic Host Configuration Protocol", "Hands out IP addresses automatically. Instruments often need a fixed one instead."],
      ["DNS", "Domain Name System", "Turns names into IP addresses."],
      ["NTP", "Network Time Protocol", "Keeps clocks in sync so test records have trustworthy timestamps."],
      ["SSH", "Secure Shell", "Encrypted remote login, used to reach a DUT or a station."],
      ["SFTP", "SSH File Transfer Protocol", "Secure file copy, for logs and software releases."],
      ["VPN", "Virtual Private Network", "Secure remote access to the company network."],
      ["VM", "Virtual Machine", "A computer simulated in software, handy for build servers."],
      ["DB", "Database", "Where results and limits can be stored and queried."],
      ["SSO", "Single Sign-On", "One login for many company systems."],
    ],
  },
  {
    id: "node", title: "Server and node test",
    intro: "Terms used when testing servers and compute nodes.",
    items: [
      ["BIOS / UEFI", "Basic Input/Output System / Unified Extensible Firmware Interface", "The firmware that starts the server and sets hardware options before the operating system loads."],
      ["DIMM", "Dual In-line Memory Module", "A memory stick. A node test checks how many are present, their size and speed."],
      ["ECC", "Error-Correcting Code (memory)", "Memory that detects and corrects some errors. A rising count of corrected errors warns of a failing DIMM."],
      ["NVMe", "Non-Volatile Memory Express", "The fast storage interface used by SSDs on PCIe."],
      ["SMART", "Self-Monitoring, Analysis and Reporting Technology", "Health data that drives report about themselves."],
      ["PXE", "Preboot Execution Environment", "Booting a node over the network, often to install or test it."],
      ["SEL", "System Event Log", "The BMC's log of hardware events such as over-temperature or memory errors."],
      ["FRU", "Field Replaceable Unit", "A part that can be swapped in the field. FRU data stores its identity, such as serial number and part number."],
      ["SKU", "Stock Keeping Unit", "A specific product variant. Each SKU has its own golden configuration and test limits."],
      ["MAC", "Media Access Control (address)", "The unique hardware address of a network port. Must never be duplicated."],
      ["OUI", "Organizationally Unique Identifier", "The first three bytes of a MAC address, assigned to a manufacturer."],
      ["RAS", "Reliability, Availability, Serviceability", "Features that keep a server running and make faults visible, such as ECC and error logging."],
      ["HSM", "Hardware Security Module", "A protected device that holds signing keys, for example for production programming of signed firmware."],
    ],
  },
  {
    id: "ocp", title: "OCP rack and cooling",
    intro: "Terms for OCP racks, power and liquid cooling.",
    items: [
      ["OCP", "Open Compute Project", "A community that publishes open hardware designs for data centres: racks, servers, power, networking and cooling."],
      ["ORv3", "Open Rack Version 3", "The third-generation OCP rack, with a 48 V DC busbar. Earlier versions used a 12 V-class busbar."],
      ["OU / OpenU", "Open Unit", "Height unit of an Open Rack: 48 mm, against 44.45 mm for a standard 1U."],
      ["ToR", "Top of Rack", "The switch at the top of a rack that links its nodes to the network."],
      ["BBU", "Battery Backup Unit", "A battery shelf that keeps the rack powered briefly after power loss."],
      ["PDU", "Power Distribution Unit", "Distributes power to the equipment in a traditional rack."],
      ["HVDC", "High-Voltage DC", "A DC supply (for example around 380 V) that some data centres feed to power shelves instead of AC."],
      ["BMC", "Baseboard Management Controller", "A small controller on the server that reports sensors and controls power remotely."],
      ["IPMI", "Intelligent Platform Management Interface", "An older standard protocol for talking to a BMC."],
      ["Redfish", "Redfish (DMTF standard)", "A modern REST / JSON interface for managing servers and reading BMC sensors."],
      ["CDU", "Coolant Distribution Unit", "A pump and heat exchanger that separates the rack coolant loop from facility water."],
      ["TCS", "Technology Cooling System", "The coolant loop that reaches the IT equipment."],
      ["FWS", "Facility Water System", "The building-side water loop that feeds the CDUs."],
      ["QD / UQD", "Quick Disconnect / Universal Quick Disconnect", "A dry-break coupling that lets a node be unplugged from the loop without spilling. UQD is the family used in OCP liquid-cooled designs."],
      ["DLC", "Direct Liquid Cooling", "Liquid reaches the heat source directly through cold plates (also called direct-to-chip)."],
      ["RDHx", "Rear-Door Heat Exchanger", "A water-cooled radiator door that cools the rack's exhaust air."],
      ["L2L / L2A", "Liquid-to-Liquid / Liquid-to-Air", "The two kinds of CDU heat exchanger."],
      ["PG25", "25% Propylene Glycol", "A common water-glycol coolant mix. Protects against corrosion and freezing, but carries a little less heat than water."],
      ["&Delta;T", "Temperature difference", "For example return minus supply temperature. It sets how much flow is needed."],
      ["&Delta;P", "Pressure drop", "Pressure lost across a part such as a cold plate, quick disconnect or manifold."],
      ["LPM / GPM", "Litres / US gallons per minute", "Liquid flow-rate units."],
      ["CFM", "Cubic Feet per Minute", "Airflow unit."],
      ["TDP", "Thermal Design Power", "The heat a chip is designed to dissipate. It sizes the cooling."],
      ["TIM", "Thermal Interface Material", "Paste or pad between a chip and its cold plate or heat sink."],
      ["PUE", "Power Usage Effectiveness", "Total facility power divided by IT power. Closer to 1 is better."],
      ["HX", "Heat Exchanger", "A device that passes heat from one fluid to another."],
      ["ACS", "Advanced Cooling Solutions", "The OCP project that works on liquid-cooling specifications."],
      ["ASHRAE", "American Society of Heating, Refrigerating and Air-Conditioning Engineers", "Publishes data-centre thermal and liquid-cooling guidelines, including facility-water temperature classes."],
      ["PMBus", "Power Management Bus", "An open standard, running over I2C, for monitoring and controlling power supplies and converters."],
      ["SELV", "Safety Extra-Low Voltage", "Voltage levels (for DC, commonly up to 60 V) treated as low risk of shock. A 48 V busbar is below it but can still supply very high current."],
      ["N+1 / N+N", "Redundancy schemes", "N modules carry the load and one (or N) spare modules take over if a module fails."],
      ["GPU", "Graphics Processing Unit", "The accelerator chip used for AI work. Draws hundreds of watts each, which is why AI racks need liquid cooling."],
      ["OAM", "OCP Accelerator Module", "An OCP-defined module form factor for accelerators such as GPUs."],
      ["NIC", "Network Interface Card", "The adapter that connects a node to the network."],
      ["OCP Accepted / Inspired", "OCP recognition levels", "Accepted: the product meets an OCP specification and passed OCP review. Inspired: based on OCP designs but not fully conformant."],
      ["PFAS", "Per- and polyfluoroalkyl substances", "A chemical family under regulatory scrutiny. Some two-phase cooling fluids contain them."],
    ],
  },
  {
    id: "safety", title: "Safety and compliance",
    intro: "Rules that protect people, products and customers.",
    items: [
      ["ESD", "Electrostatic Discharge", "A static spark that can damage components. Stations need wrist straps, mats and grounding."],
      ["EHS", "Environment, Health and Safety", "The function and rules that keep people and the environment safe."],
      ["PPE", "Personal Protective Equipment", "Gloves, glasses and other protection."],
      ["LOTO", "Lockout / Tagout", "Making equipment safe and locked before maintenance."],
      ["E-stop", "Emergency Stop", "The big red button that cuts power at once."],
      ["RoHS", "Restriction of Hazardous Substances", "Rules limiting certain materials in electronics."],
      ["IPC", "IPC (electronics industry association)", "Publishes standards such as IPC-A-610, acceptability of assemblies."],
      ["ISO 9001", "ISO 9001", "A widely used standard for quality management systems."],
    ],
  },
];

/* ------------------------------------------------------------------ cooling comparison */
/* Ranges are indicative. Real limits come from the design and the program specification. */
TDE.COOLING = {
  criteria: [
    ["how", "How it works"],
    ["density", "Typical rack heat (indicative)"],
    ["share", "Share of heat taken by liquid"],
    ["coolant", "Coolant"],
    ["facility", "What the facility provides"],
    ["pros", "Main advantages"],
    ["cons", "Main risks and limits"],
    ["service", "Service and upkeep"],
    ["tde", "What a TDE tests"],
  ],
  methods: [
    {
      id: "air", name: "Air (fans)", short: "Fans",
      how: "Fans pull cool air front to back through the server. The heat leaves in the exhaust air and the room or aisle containment carries it to the air handlers.",
      density: "Roughly 10 to 25 kW per rack. Practical limit set by airflow and containment.",
      share: "0%. All heat goes into the air.",
      coolant: "Air",
      facility: "Air handlers, chilled water to the coils, aisle containment.",
      pros: "Simple and familiar. No leak risk. Cheapest to build and to service. Works with standard hardware.",
      cons: "Fans consume a lot of power and make noise. Air carries little heat per volume, so hot chips and dense racks hit a ceiling. Hot spots.",
      service: "Fans are hot-swappable wear items. Filters need changing.",
      tde: "Fan speed and fault tests, airflow and thermal soak under load, fan-failure response.",
    },
    {
      id: "rdhx", name: "Rear-door heat exchanger", short: "Rear door",
      how: "A water-cooled radiator on the back of the rack cools the exhaust air before it re-enters the room. The servers inside are still air-cooled.",
      density: "Roughly tens of kW per rack, depending on the door and the water temperature.",
      share: "Most of the rack's heat can be removed at the door (design dependent), but the chips themselves are still air-cooled.",
      coolant: "Water or water-glycol to the door",
      facility: "Water connection to every rack, supply temperature above the dew point.",
      pros: "Can be retrofitted to existing air-cooled racks. No change inside the server. Keeps the room neutral.",
      cons: "Chip cooling is still limited by air. Door weight and hoses. Condensation if the water is too cold. Fans still needed.",
      service: "Door hoses and fittings to inspect. Condensation checks.",
      tde: "Door leak and pressure tests, flow and pressure drop, door sensors, fan response.",
    },
    {
      id: "dlc", name: "Direct-to-chip, water (single-phase)", short: "Water (D2C)",
      how: "Cold plates sit on the hot chips. Water or a water-glycol mix flows through them to a rack manifold, and a CDU passes the heat to facility water. Remaining parts (memory, drives, power) still use some air.",
      density: "Commonly tens of kW up to 100 kW or more per rack.",
      share: "Roughly 70 to 80% in typical designs. The rest is removed by air.",
      coolant: "Water or PG25, inhibited and filtered",
      facility: "CDU (in rack or row), facility water loop. Warm-water designs allow dry coolers.",
      pros: "Very high density. Far less fan power. Chips run cooler or at higher power. Warm water saves chiller energy. Nodes stay serviceable thanks to quick disconnects.",
      cons: "Leak risk inside the IT space. New parts to qualify: cold plates, hoses, QDs, manifolds, CDUs. Fluid quality must be controlled. Still needs some air.",
      service: "QD cycle life, filters, coolant checks, hose inspection.",
      tde: "Leak and pressure decay, flow and pressure drop, fill and purge, QD mating, thermal soak, sensor and alarm checks, drain and dry before shipping.",
    },
    {
      id: "dlc2", name: "Direct-to-chip, two-phase", short: "Two-phase D2C",
      how: "A dielectric fluid flows to the cold plates and boils there. The vapour carries the heat away and condenses in a heat exchanger. Boiling absorbs a lot of heat at a steady temperature.",
      density: "High, comparable to or above single-phase direct-to-chip.",
      share: "Similar to single-phase direct-to-chip.",
      coolant: "Engineered dielectric fluid with a low boiling point",
      facility: "Condenser or CDU for the two-phase fluid, and facility water.",
      pros: "Handles very high heat flux. Even chip temperature. A leak of dielectric fluid does not short electronics.",
      cons: "Specialised and costly fluids. Some fluids face regulatory scrutiny (for example PFAS). Pressure and vapour management. Less mature supply chain.",
      service: "Fluid inventory and seals. Vapour-tight service procedures.",
      tde: "Tight leak testing, charge level, pressure and temperature profile, vapour containment.",
    },
    {
      id: "imm1", name: "Immersion, single-phase", short: "Immersion (1-phase)",
      how: "Servers sit in a tank of dielectric fluid (oil-like) that stays liquid. Pumps move the fluid through a heat exchanger.",
      density: "Often 50 to 100 kW or more per tank.",
      share: "Nearly all. Server fans are removed.",
      coolant: "Dielectric oil or synthetic fluid",
      facility: "Tank, pumps, heat exchanger, facility water. Strong floor for the tank weight.",
      pros: "Takes nearly all the heat. No server fans, so quiet. Even cooling. Simple server design with no cold plates.",
      cons: "Heavy tanks. Messy service. Materials must be compatible with the fluid (cables, seals, labels, optics). Hardware must be adapted. Not an OCP Open Rack form factor.",
      service: "Lift servers out and let them drip dry. Fluid quality and filtering.",
      tde: "Material compatibility, fluid temperature and flow, qualification of nodes in the fluid, cleaning rules, contamination control.",
    },
    {
      id: "imm2", name: "Immersion, two-phase", short: "Immersion (2-phase)",
      how: "Servers sit in a sealed tank of a low-boiling dielectric. The fluid boils on hot chips, the vapour rises, condenses on a coil and drips back.",
      density: "Very high, in the 100 kW class and above.",
      share: "Nearly all.",
      coolant: "Engineered low-boiling dielectric fluid",
      facility: "Condenser coil with facility water, sealed tank, vapour management.",
      pros: "Passive boiling, very high heat flux, even temperature, no pumps in the server heat path.",
      cons: "Costly fluid that is lost as vapour when the tank is opened. Some fluids face regulatory scrutiny (PFAS). Sealed-tank handling. Specialised hardware.",
      service: "Opening procedures that limit vapour loss, fluid inventory, vapour recovery.",
      tde: "Tank sealing and vapour loss, node qualification, behaviour of components when boiling, containment.",
    },
  ],
};
