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
