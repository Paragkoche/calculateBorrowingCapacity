export function PMT(
  rate: number,
  nperiod: number,
  pv: number,
  fv: number = 0,
  type: number = 0
) {
  if (!fv) fv = 0;
  if (!type) type = 0;

  if (rate == 0) return -(pv + fv) / nperiod;

  var pvif = Math.pow(1 + rate, nperiod);
  var pmt = (rate / (pvif - 1)) * -(pv * pvif + fv);

  if (type == 1) {
    pmt /= 1 + rate;
  }

  return pmt;
}
