const tax_level = {
  l1: 18200.0,
  l2: 45000.0,
  l3: 135000.0,
  l4: 190000.0,
};
const tax_rate = {
  l1: 16,
  l2: 30,
  l3: 37,
  l4: 45,
};

/**
 


 */
const HemTable: {
  [bank in string]: {
    [index in string]: number[];
  };
} = {
  nab: {
    C0: [
      2543, 2543, 2614, 2719, 2899, 3174, 3517, 3837, 4193, 4379, 4651, 5186,
      5821, 5983,
    ],
    C1: [
      3005, 3005, 3005, 3110, 3291, 3568, 3912, 4233, 4592, 4778, 5052, 5590,
      6228, 6391,
    ],
    C2: [
      3316, 3316, 3316, 3421, 3601, 3877, 4221, 4541, 4899, 5085, 5357, 5894,
      6530, 6693,
    ],
    C3: [
      3677, 3677, 3677, 3677, 3856, 4130, 4471, 4789, 5143, 5328, 5598, 6130,
      6762, 6923,
    ],
    C4: [
      3934, 3934, 3934, 3934, 4111, 4383, 4721, 5036, 5388, 5571, 5839, 6367,
      6993, 7153,
    ],
    C5: [
      4191, 4191, 4191, 4191, 4367, 4636, 4971, 5284, 5632, 5814, 6080, 6603,
      7224, 7383,
    ],
    C6: [
      4447, 4447, 4447, 4447, 4622, 4889, 5221, 5531, 5877, 6057, 6321, 6840,
      7455, 7612,
    ],
    C7: [
      4704, 4704, 4704, 4704, 4877, 5142, 5471, 5779, 6121, 6300, 6562, 7076,
      7687, 7842,
    ],
    C8: [
      4961, 4961, 4961, 4961, 5132, 5394, 5722, 6026, 6366, 6543, 6802, 7312,
      7918, 8072,
    ],
    C9: [
      5217, 5217, 5217, 5217, 5387, 5647, 5972, 6274, 6611, 6786, 7043, 7549,
      8149, 8302,
    ],
    S0: [
      1310, 1374, 1445, 1549, 1728, 2001, 2343, 2660, 3015, 3199, 3470, 4002,
      4633, 4794,
    ],
    S1: [
      1815, 1815, 1886, 1990, 2170, 2444, 2786, 3104, 3459, 3644, 3915, 4448,
      5081, 5242,
    ],
    S2: [
      2300, 2300, 2372, 2477, 2657, 2932, 3276, 3596, 3954, 4140, 4412, 4948,
      5585, 5747,
    ],
    S3: [
      2857, 2857, 2857, 2963, 3144, 3421, 3767, 4089, 4448, 4635, 4910, 5449,
      6089, 6252,
    ],
    S4: [
      3343, 3343, 3343, 3449, 3631, 3910, 4258, 4581, 4943, 5131, 5407, 5949,
      6593, 6757,
    ],
    S5: [
      3828, 3828, 3828, 3935, 4118, 4399, 4748, 5074, 5438, 5627, 5904, 6450,
      7097, 7262,
    ],
    S6: [
      4313, 4313, 4313, 4421, 4605, 4887, 5239, 5567, 5932, 6122, 6402, 6950,
      7601, 7767,
    ],
    S7: [
      4799, 4799, 4799, 4907, 5092, 5376, 5730, 6059, 6427, 6618, 6899, 7451,
      8105, 8273,
    ],
    S8: [
      5284, 5284, 5284, 5393, 5579, 5865, 6220, 6552, 6921, 7114, 7396, 7951,
      8610, 8778,
    ],
    S9: [
      5770, 5770, 5770, 5879, 6066, 6353, 6711, 7044, 7416, 7610, 7893, 8452,
      9114, 9283,
    ],
  },
  amp: {
    C0: [
      2568, 2568, 2628, 2754, 2923, 3178, 3555, 3880, 4230, 4434, 4715, 5209,
      5945, 6036,
    ],
    C1: [
      2568, 2568, 2979, 3105, 3273, 3529, 3906, 4226, 4577, 4780, 5062, 5551,
      6287, 6378,
    ],
    C2: [
      2568, 2568, 3325, 3447, 3620, 3875, 4252, 4577, 4932, 5135, 5417, 5910,
      6651, 6746,
    ],
    C3: [
      2568, 2568, 3325, 3721, 3893, 4148, 4523, 4847, 5200, 5403, 5683, 6175,
      6913, 7007,
    ],
    CDep: [0, 0, 0, 274, 273, 272, 271, 270, 268, 268, 266, 265, 262, 261],
    S0: [
      1321, 1394, 1455, 1576, 1749, 2005, 2382, 2706, 3057, 3260, 3542, 4036,
      4772, 4863,
    ],
    S1: [
      1321, 1845, 1905, 2031, 2204, 2468, 2849, 3183, 3538, 3750, 4036, 4538,
      5287, 5382,
    ],
    S2: [
      1321, 2338, 2403, 2524, 2702, 2962, 3343, 3672, 4027, 4235, 4521, 5018,
      5768, 5863,
    ],
    S3: [
      1321, 2338, 2899, 3020, 3196, 3455, 3834, 4162, 4515, 4722, 5007, 5502,
      6248, 6343,
    ],
    SDep: [0, 0, 496, 495, 494, 493, 491, 490, 488, 487, 486, 484, 480, 480],
  },
  alex: {
    C0: [
      2568, 2568, 2628, 2754, 2923, 3178, 3555, 3880, 4230, 4434, 4715, 5209,
      5945, 6036,
    ],
    C1: [
      2568, 2568, 2979, 3105, 3273, 3529, 3906, 4226, 4577, 4780, 5062, 5551,
      6287, 6378,
    ],
    C2: [
      2568, 2568, 3325, 3447, 3620, 3875, 4252, 4577, 4932, 5135, 5417, 5910,
      6651, 6746,
    ],
    C3: [
      2568, 2568, 3325, 3721, 3893, 4148, 4523, 4847, 5200, 5403, 5683, 6175,
      6913, 7007,
    ],
    CDep: [0, 0, 0, 274, 273, 272, 271, 270, 268, 268, 266, 265, 262, 261],
    S0: [
      1321, 1394, 1455, 1576, 1749, 2005, 2382, 2706, 3057, 3260, 3542, 4036,
      4772, 4863,
    ],
    S1: [
      1321, 1845, 1905, 2031, 2204, 2468, 2849, 3183, 3538, 3750, 4036, 4538,
      5287, 5382,
    ],
    S2: [
      1321, 2338, 2403, 2524, 2702, 2962, 3343, 3672, 4027, 4235, 4521, 5018,
      5768, 5863,
    ],
    S3: [
      1321, 2338, 2899, 3020, 3196, 3455, 3834, 4162, 4515, 4722, 5007, 5502,
      6248, 6343,
    ],
    SDep: [0, 0, 496, 495, 494, 493, 491, 490, 488, 487, 486, 484, 480, 480],
  },
  anz: {
    C0: [
      2568, 2568, 2628, 2754, 2923, 3178, 3555, 3880, 4230, 4434, 4715, 5209,
      5945, 6036,
    ],
    C1: [
      2568, 2568, 2979, 3105, 3273, 3529, 3906, 4226, 4577, 4780, 5062, 5551,
      6287, 6378,
    ],
    C2: [
      2568, 2568, 3325, 3447, 3620, 3875, 4252, 4577, 4932, 5135, 5417, 5910,
      6651, 6746,
    ],
    C3: [
      2568, 2568, 3325, 3721, 3893, 4148, 4523, 4847, 5200, 5403, 5683, 6175,
      6913, 7007,
    ],
    CDep: [0, 0, 0, 274, 273, 272, 271, 270, 268, 268, 266, 265, 262, 261],
    S0: [
      1321, 1394, 1455, 1576, 1749, 2005, 2382, 2706, 3057, 3260, 3542, 4036,
      4772, 4863,
    ],
    S1: [
      1321, 1845, 1905, 2031, 2204, 2468, 2849, 3183, 3538, 3750, 4036, 4538,
      5287, 5382,
    ],
    S2: [
      1321, 2338, 2403, 2524, 2702, 2962, 3343, 3672, 4027, 4235, 4521, 5018,
      5768, 5863,
    ],
    S3: [
      1321, 2338, 2899, 3020, 3196, 3455, 3834, 4162, 4515, 4722, 5007, 5502,
      6248, 6343,
    ],
    SDep: [0, 0, 496, 495, 494, 493, 491, 490, 488, 487, 486, 484, 480, 480],
  },
  amb: {
    C0: [
      2568, 2568, 2628, 2754, 2923, 3178, 3555, 3880, 4230, 4434, 4715, 5209,
      5945, 6036,
    ],
    C1: [
      2568, 2568, 2979, 3105, 3273, 3529, 3906, 4226, 4577, 4780, 5062, 5551,
      6287, 6378,
    ],
    C2: [
      2568, 2568, 3325, 3447, 3620, 3875, 4252, 4577, 4932, 5135, 5417, 5910,
      6651, 6746,
    ],
    C3: [
      2568, 2568, 3325, 3721, 3893, 4148, 4523, 4847, 5200, 5403, 5683, 6175,
      6913, 7007,
    ],
    CDep: [0, 0, 0, 274, 273, 272, 271, 270, 268, 268, 266, 265, 262, 261],
    S0: [
      1321, 1394, 1455, 1576, 1749, 2005, 2382, 2706, 3057, 3260, 3542, 4036,
      4772, 4863,
    ],
    S1: [
      1321, 1845, 1905, 2031, 2204, 2468, 2849, 3183, 3538, 3750, 4036, 4538,
      5287, 5382,
    ],
    S2: [
      1321, 2338, 2403, 2524, 2702, 2962, 3343, 3672, 4027, 4235, 4521, 5018,
      5768, 5863,
    ],
    S3: [
      1321, 2338, 2899, 3020, 3196, 3455, 3834, 4162, 4515, 4722, 5007, 5502,
      6248, 6343,
    ],
    SDep: [0, 0, 496, 495, 494, 493, 491, 490, 488, 487, 486, 484, 480, 480],
  },
  westpac: {
    S0: [
      1323, 1395, 1458, 1580, 1751, 2007, 2384, 2707, 3059, 3264, 3545, 4037,
      4775, 4867,
    ],
    S1: [
      1845, 1845, 1909, 2033, 2208, 2469, 2854, 3184, 3543, 3752, 4038, 4541,
      5293, 5387,
    ],
    S2: [
      2341, 2341, 2405, 2529, 2703, 2963, 3346, 3674, 4031, 4240, 4525, 5025,
      5774, 5867,
    ],
    S3: [
      2901, 2901, 2901, 3025, 3197, 3457, 3837, 4164, 4520, 4727, 5011, 5509,
      6255, 6347,
    ],
    S4: [
      3381, 3381, 3381, 3505, 3677, 3937, 4317, 4644, 5000, 5207, 5491, 5989,
      6735, 6827,
    ],
    S5: [
      3861, 3861, 3861, 3985, 4157, 4417, 4797, 5124, 5480, 5687, 5971, 6469,
      7215, 7307,
    ],
    S6: [
      4341, 4341, 4341, 4465, 4637, 4897, 5277, 5604, 5960, 6167, 6451, 6949,
      7695, 7787,
    ],
    S7: [
      4821, 4821, 4821, 4945, 5117, 5377, 5757, 6084, 6440, 6647, 6931, 7429,
      8175, 8267,
    ],
    S8: [
      5301, 5301, 5301, 5425, 5597, 5857, 6237, 6564, 6920, 7127, 7411, 7909,
      8655, 8747,
    ],
    S9: [
      5781, 5781, 5781, 5905, 6077, 6337, 6717, 7044, 7400, 7607, 7891, 8389,
      9135, 9227,
    ],
    S10: [
      6261, 6261, 6261, 6385, 6557, 6817, 7197, 7524, 7880, 8087, 8371, 8869,
      9615, 9707,
    ],
    C0: [
      2570, 2570, 2633, 2755, 2926, 3182, 3559, 3883, 4234, 4440, 4720, 5213,
      5950, 6042,
    ],
    C1: [
      2984, 2984, 2984, 3105, 3276, 3532, 3908, 4230, 4581, 4786, 5066, 5557,
      6293, 6385,
    ],
    C2: [
      3328, 3328, 3328, 3450, 3622, 3879, 4258, 4582, 4935, 5141, 5423, 5917,
      6658, 6750,
    ],
    C3: [
      3725, 3725, 3725, 3725, 3896, 4152, 4529, 4852, 5204, 5409, 5690, 6182,
      6919, 7011,
    ],
    C4: [
      3986, 3986, 3986, 3986, 4157, 4413, 4790, 5113, 5465, 5670, 5951, 6443,
      7180, 7272,
    ],
    C5: [
      4247, 4247, 4247, 4247, 4418, 4674, 5051, 5374, 5726, 5931, 6212, 6704,
      7441, 7533,
    ],
    C6: [
      4508, 4508, 4508, 4508, 4679, 4935, 5312, 5635, 5987, 6192, 6473, 6965,
      7702, 7794,
    ],
    C7: [
      4769, 4769, 4769, 4769, 4940, 5196, 5573, 5896, 6248, 6453, 6734, 7226,
      7963, 8055,
    ],
    C8: [
      5030, 5030, 5030, 5030, 5201, 5457, 5834, 6157, 6509, 6714, 6995, 7487,
      8224, 8316,
    ],
    C9: [
      5291, 5291, 5291, 5291, 5462, 5718, 6095, 6418, 6770, 6975, 7256, 7748,
      8485, 8577,
    ],
    C10: [
      5552, 5552, 5552, 5552, 5723, 5979, 6356, 6679, 7031, 7236, 7517, 8009,
      8746, 8838,
    ],
  },
};

export const textLevels = (bank: string, income: number, abjIncome = 0) => {
  const medicare: {
    [key: string]: { min: number; levy: number; max: number };
  } = {
    nab: { min: 256000, levy: 2, max: 32500 },
    amp: {
      min: 24276,
      max: 30345,
      levy: 2,
    },
    westpac: {
      min: 26000,
      max: 32500,
      levy: 2,
    },
    alex: {
      min: 26000,
      max: 32500,
      levy: 2,
    },
    anz: {
      min: 26000,
      max: 32500,
      levy: 2,
    },
    amb: {
      min: 26000,
      max: 32500,
      levy: 2,
    },
  };

  const annualIncome: number = income;

  const taxes: {
    [key in string]: number;
  } = {};
  if (annualIncome < tax_level.l1) {
    taxes["t1"] = 0;
  } else {
    if (annualIncome <= tax_level.l2) {
      taxes["t1"] = ((annualIncome - tax_level.l1) * tax_rate.l1) / 100;
    } else {
      taxes["t1"] = ((tax_level.l2 - tax_level.l1) * tax_rate.l1) / 100;
    }
  }

  if (annualIncome < tax_level.l2) {
    taxes["t2"] = 0;
  } else {
    if (annualIncome <= tax_level.l3) {
      taxes["t2"] = ((annualIncome - tax_level.l2) * tax_rate.l2) / 100;
    } else {
      taxes["t2"] = ((tax_level.l3 - tax_level.l2) * tax_rate.l2) / 100;
    }
  }

  if (annualIncome < tax_level.l3) {
    taxes["t3"] = 0;
  } else {
    if (annualIncome <= tax_level.l4) {
      taxes["t3"] = ((annualIncome - tax_level.l3) * tax_rate.l3) / 100;
    } else {
      taxes["t3"] = ((tax_level.l4 - tax_level.l3) * tax_rate.l3) / 100;
    }
  }

  if (annualIncome > tax_level.l4) {
    taxes["t4"] = (annualIncome - tax_level.l4) * (tax_rate.l4 / 100);
  } else {
    taxes["t4"] = 0;
  }
  let m_levy = 0;
  if (annualIncome <= medicare[bank].max) {
    m_levy = 0;
  } else {
    if (annualIncome < medicare[bank].max) {
      m_levy = (annualIncome - medicare[bank].min) * 0.1;
    } else {
      m_levy = (annualIncome * medicare[bank].levy) / 100;
    }
  }
  let tax_rate_ = 0;
  // console.log("", taxes, m_levy);

  if (annualIncome <= 0 || annualIncome - abjIncome <= 0) {
    tax_rate_ = 0;
  } else {
    tax_rate_ =
      (taxes.t1 + taxes.t2 + taxes.t3 + taxes.t4 + m_levy) / annualIncome;
  }
  // console.log("rate :", tax_rate_);

  let taxed_inc_excl_adj =
    (1 - tax_rate_) * (annualIncome + 0.9 * 0 + 0.9 * 0 + 0.6 * 0);
  let taxed_se = (1 - tax_rate_) * 0;

  // console.log("tax:", taxed_inc_excl_adj);

  return {
    taxRate: tax_rate_,
    taxIncExclAdj: taxed_inc_excl_adj,
    taxSEAdj: taxed_se,
  };
};

export const Hem = (bank: string, income: number, rent: string) => {
  // console.log(rent.charAt(0));
  let table = HemTable[bank];

  let index = 0;

  if (26000 < income) {
    index += 1;
  }
  if (39000 < income) {
    index += 1;
  }
  if (51000 < income) {
    index += 1;
  }
  if (64000 < income) {
    index += 1;
  }
  if (77000 < income) {
    index += 1;
  }
  if (103000 < income) {
    index += 1;
  }
  if (129000 < income) {
    index += 1;
  }
  if (154000 < income) {
    index += 1;
  }
  if (180000 < income) {
    index += 1;
  }
  if (206000 < income) {
    index += 1;
  }
  if (257000 < income) {
    index += 1;
  }
  if (321000 < income) {
    index += 1;
  }
  if (386000 < income) {
    index += 1;
  }

  if (parseInt(rent.charAt(1)) > 3 && bank != "nab" && bank != "westpac") {
    return (
      table[`${rent.charAt(0)}3`][index] +
      (parseInt(rent.charAt(1)) - 3) * table[rent.charAt(0) + "Dep"][index]
    );
  }
  console.log(bank);

  console.table(table);
  // console.table(table[rent])
  // console.log(rent,index,bank);

  return table[rent][index];
};
