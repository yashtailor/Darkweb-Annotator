import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
// const NGROK_LINK = 'http://localhost:5000';

// to return the current selected elements
function getSelectedElementTags() {
  var range, sel, elmlist, treeWalker, containerElement,startOffset, endOffset;
  
  sel = window.getSelection();
  if (sel.rangeCount > 0) {
      range = sel.getRangeAt(0);
      startOffset = range.startOffset;
      endOffset = range.endOffset;
  }

  // if there is any range
  if (range) {

      // getting the ancestor i.e. the root element
      containerElement = range.commonAncestorContainer;
      if (containerElement.nodeType !== 1) {
          containerElement = containerElement.parentNode;
      }

      // creating a tree walker to iterate through all the elements
      // here if the current node intersects with the selection then we accept it or else reject ot
      treeWalker = window.document.createTreeWalker(
          containerElement,
          NodeFilter.SHOW_ELEMENT,
          function(node) { return range.intersectsNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT; },
          false
      );

      // we take the current node
      elmlist = [treeWalker.currentNode];

      // we iterate through all the accepted nodes and store it in elmlist
      while (treeWalker.nextNode()) {
          elmlist.push(treeWalker.currentNode);
      }

      return [elmlist,startOffset,endOffset];
  }
}

const finalArray = [];

function App() {
  const text = `The Indian subcontinent, the great landmass of South Asia, is the home of one of the world’s oldest and most influential civilizations. In this article, the subcontinent, which for historical purposes is usually called simply “India,” is understood to comprise the areas of not only the present-day Republic of India but also the republics of Pakistan (partitioned from India in 1947) and Bangladesh (which formed the eastern part of Pakistan until its independence in 1971). For the histories of these latter two countries since their creation, see Pakistan and Bangladesh. Since early times the Indian subcontinent appears to have provided an attractive habitat for human occupation. Toward the south it is effectively sheltered by wide expanses of ocean, which tended to isolate it culturally in ancient times, while to the north it is protected by the massive ranges of the Himalayas, which also sheltered it from the Arctic winds and the air currents of Central Asia. Only in the northwest and northeast is there easier access by land, and it was through those two sectors that most of the early contacts with the outside world took place.`
  const textArray = [['1', 0, 1, 'N/A'], ['Therapy', 2, 9, 'N/A'], ['with', 10, 14, 'N/A'], ['lipid', 15, 20, 'N/A'], ['-', 20, 21, 'N/A'], ['altering', 21, 29, 'N/A'], ['agents', 30, 36, 'N/A'], ['should', 37, 43, 'N/A'], ['be', 44, 46, 'N/A'], ['only', 47, 51, 'N/A'], ['one', 52, 55, 'N/A'], ['component', 56, 65, 'N/A'], ['of', 66, 68, 'N/A'], ['multiple', 69, 77, 'N/A'], ['risk', 78, 82, 'N/A'], ['factor', 83, 89, 'N/A'], ['intervention', 90, 102, 'N/A'], ['in', 103, 105, 'N/A'], ['individuals', 106, 117, 'N/A'], ['at', 118, 120, 'N/A'], ['significantly', 121, 134, 'N/A'], ['increased', 135, 144, 'N/A'], ['risk', 145, 149, 'N/A'], ['for', 150, 153, 'N/A'], ['atherosclerotic', 154, 169, 'N/A'], ['vascular', 170, 178, 'N/A'], ['disease', 179, 186, 'N/A'], ['due', 187, 190, 'N/A'], ['to', 191, 193, 'N/A'], ['hypercholesterolemia', 194, 214, 'Indication'], ['.', 214, 215, 'N/A'], ['Drug', 216, 220, 'Indication'], ['therapy', 221, 228, 'Indication'], ['is', 229, 231, 'N/A'], ['recommended', 232, 243, 'N/A'], ['as', 244, 246, 'N/A'], ['an', 247, 249, 'N/A'], ['adjunct', 250, 257, 'N/A'], ['to', 258, 260, 'N/A'], ['diet', 261, 265, 'N/A'], ['when', 266, 270, 'N/A'], ['the', 271, 274, 'N/A'], ['response', 275, 283, 'N/A'], ['to', 284, 286, 'N/A'], ['a', 287, 288, 'N/A'], ['diet', 289, 293, 'N/A'], ['restricted', 294, 304, 'N/A'], ['in', 305, 307, 'N/A'], ['saturated', 308, 317, 'N/A'], ['fat', 318, 321, 'N/A'], ['and', 322, 325, 'N/A'], ['cholesterol', 326, 337, 'DRUG'], ['and', 338, 341, 'N/A'], ['other', 342, 347, 'N/A'], ['nonpharmacologic', 348, 364, 'N/A'], ['measures', 365, 373, 'N/A'], ['alone', 374, 379, 'N/A'], ['has', 380, 383, 'N/A'], ['been', 384, 388, 'N/A'], ['inadequate', 389, 399, 'N/A'], ['.', 399, 400, 'N/A'], ['In', 401, 403, 'N/A'], ['patients', 404, 412, 'N/A'], ['with', 413, 417, 'N/A'], ['CHD', 418, 421, 'N/A'], ['or', 422, 424, 'N/A'], ['multiple', 425, 433, 'N/A'], ['risk', 434, 438, 'N/A'], ['factors', 439, 446, 'N/A'], ['for', 447, 450, 'N/A'], ['CHD', 451, 454, 'N/A'], [',', 454, 455, 'N/A'], ['atorvastatin', 456, 468, 'DRUG'], ['calcium', 469, 476, 'DRUG'], ['tablets', 477, 484, 'N/A'], ['can', 485, 488, 'N/A'], ['be', 489, 491, 'N/A'], ['started', 492, 499, 'N/A'], ['simultaneously', 500, 514, 'N/A'], ['with', 515, 519, 'N/A'], ['diet.1.1', 520, 528, 'N/A'], ['Prevention', 529, 539, 'Indication'], ['of', 540, 542, 'N/A'], ['Cardiovascular', 543, 557, 'N/A'], ['Disease', 558, 565, 'N/A'], ['in', 566, 568, 'N/A'], ['AdultsIn', 569, 577, 'DRUG'], ['adult', 578, 583, 'N/A'], ['patients', 584, 592, 'N/A'], ['without', 593, 600, 'N/A'], ['clinically', 601, 611, 'N/A'], ['evident', 612, 619, 'N/A'], ['coronary', 620, 628, 'Indication'], ['heart', 629, 634, 'Indication'], ['disease', 635, 642, 'Indication'], [',', 642, 643, 'N/A'], ['but', 644, 647, 'N/A'], ['with', 648, 652, 'N/A'], ['multiple', 653, 661, 'N/A'], ['risk', 662, 666, 'N/A'], ['factors', 667, 674, 'N/A'], ['for', 675, 678, 'N/A'], ['coronary', 679, 687, 'Indication'], ['heart', 688, 693, 'Indication'], ['disease', 694, 701, 'Indication'], ['such', 702, 706, 'N/A'], ['as', 707, 709, 'N/A'], ['age', 710, 713, 'N/A'], [',', 713, 714, 'N/A'], ['smoking', 715, 722, 'N/A'], [',', 722, 723, 'N/A'], ['hypertension', 724, 736, 'Indication'], [',', 736, 737, 'N/A'], ['low', 738, 741, 'Indication'], ['HDL', 742, 745, 'Indication'], ['-', 745, 746, 'N/A'], ['C', 746, 747, 'N/A'], [',', 747, 748, 'N/A'], ['or', 749, 751, 'N/A'], ['a', 752, 753, 'N/A'], ['family', 754, 760, 'N/A'], ['history', 761, 768, 'N/A'], ['of', 769, 771, 'N/A'], ['early', 772, 777, 'N/A'], ['coronary', 778, 786, 'Indication'], ['heart', 787, 792, 'Indication'], ['disease', 793, 800, 'Indication'], [',', 800, 801, 'N/A'], ['atorvastatin', 802, 814, 'DRUG'], ['calcium', 815, 822, 'DRUG'], ['tablets', 823, 830, 'N/A'], ['are', 831, 834, 'N/A'], ['indicated', 835, 844, 'N/A'], ['to:*Reduce', 845, 855, 'N/A'], ['the', 856, 859, 'N/A'], ['risk', 860, 864, 'N/A'], ['of', 865, 867, 'N/A'], ['myocardial', 868, 878, 'Indication'], ['infarction', 879, 889, 'Indication'], ['*', 890, 891, 'N/A'], ['Reduce', 891, 897, 'N/A'], ['the', 898, 901, 'N/A'], ['risk', 902, 906, 'N/A'], ['of', 907, 909, 'N/A'], ['stroke', 910, 916, 'Indication'], ['*', 917, 918, 'N/A'], ['Reduce', 918, 924, 'N/A'], ['the', 925, 928, 'N/A'], ['risk', 929, 933, 'N/A'], ['for', 934, 937, 'N/A'], ['revascularization', 938, 955, 'N/A'], ['procedures', 956, 966, 'N/A'], ['and', 967, 970, 'N/A'], ['angina', 971, 977, 'Indication'], ['In', 978, 980, 'N/A'], ['adult', 981, 986, 'N/A'], ['patients', 987, 995, 'N/A'], ['with', 996, 1000, 'N/A'], ['type', 1001, 1005, 'Indication'], ['2', 1006, 1007, 'Indication'], ['diabetes', 1008, 1016, 'Indication'], [',', 1016, 1017, 'N/A'], ['and', 1018, 1021, 'N/A'], ['without', 1022, 1029, 'N/A'], ['clinically', 1030, 1040, 'N/A'], ['evident', 1041, 1048, 'N/A'], ['coronary', 1049, 1057, 'Indication'], ['heart', 1058, 1063, 'Indication'], ['disease', 1064, 1071, 'Indication'], [',', 1071, 1072, 'N/A'], ['but', 1073, 1076, 'N/A'], ['with', 1077, 1081, 'N/A'], ['multiple', 1082, 1090, 'N/A'], ['risk', 1091, 1095, 'N/A'], ['factors', 1096, 1103, 'N/A'], ['for', 1104, 1107, 'N/A'], ['coronary', 1108, 1116, 'Indication'], ['heart', 1117, 1122, 'Indication'], ['disease', 1123, 1130, 'Indication'], ['such', 1131, 1135, 'N/A'], ['as', 1136, 1138, 'N/A'], ['retinopathy', 1139, 1150, 'Indication'], [',', 1150, 1151, 'N/A'], ['albuminuria', 1152, 1163, 'Indication'], [',', 1163, 1164, 'N/A'], ['smoking', 1165, 1172, 'N/A'], [',', 1172, 1173, 'N/A'], ['or', 1174, 1176, 'N/A'], ['hypertension', 1177, 1189, 'Indication'], [',', 1189, 1190, 'N/A'], ['atorvastatin', 1191, 1203, 'DRUG'], ['calcium', 1204, 1211, 'DRUG'], ['tablets', 1212, 1219, 'N/A'], ['are', 1220, 1223, 'N/A'], ['indicated', 1224, 1233, 'N/A'], ['to:*Reduce', 1234, 1244, 'N/A'], ['the', 1245, 1248, 'N/A'], ['risk', 1249, 1253, 'N/A'], ['of', 1254, 1256, 'N/A'], ['myocardial', 1257, 1267, 'Indication'], ['infarction', 1268, 1278, 'Indication'], ['*', 1279, 1280, 'N/A'], ['Reduce', 1280, 1286, 'N/A'], ['the', 1287, 1290, 'N/A'], ['risk', 1291, 1295, 'N/A'], ['of', 1296, 1298, 'N/A'], ['stroke', 1299, 1305, 'Indication'], ['In', 1306, 1308, 'N/A'], ['adult', 1309, 1314, 'N/A'], ['patients', 1315, 1323, 'N/A'], ['with', 1324, 1328, 'N/A'], ['clinically', 1329, 1339, 'N/A'], ['evident', 1340, 1347, 'N/A'], ['coronary', 1348, 1356, 'Indication'], ['heart', 1357, 1362, 'Indication'], ['disease', 1363, 1370, 'Indication'], [',', 1370, 1371, 'N/A'], ['atorvastatin', 1372, 1384, 'DRUG'], ['calcium', 1385, 1392, 'DRUG'], ['tablets', 1393, 1400, 'N/A'], ['are', 1401, 1404, 'N/A'], ['indicated', 1405, 1414, 'N/A'], ['to:*Reduce', 1415, 1425, 'N/A'], ['the', 1426, 1429, 'N/A'], ['risk', 1430, 1434, 'N/A'], ['of', 1435, 1437, 'N/A'], ['non', 1438, 1441, 'N/A'], ['-', 1441, 1442, 'N/A'], ['fatal', 1442, 1447, 'N/A'], ['myocardial', 1448, 1458, 'Indication'], ['infarction', 1459, 1469, 'Indication'], ['*', 1470, 1471, 'N/A'], ['Reduce', 1471, 1477, 'N/A'], ['the', 1478, 1481, 'N/A'], ['risk', 1482, 1486, 'N/A'], ['of', 1487, 1489, 'N/A'], ['fatal', 1490, 1495, 'N/A'], ['and', 1496, 1499, 'N/A'], ['non', 1500, 1503, 'N/A'], ['-', 1503, 1504, 'N/A'], ['fatal', 1504, 1509, 'N/A'], ['stroke', 1510, 1516, 'Indication'], ['*', 1517, 1518, 'N/A'], ['Reduce', 1518, 1524, 'N/A'], ['the', 1525, 1528, 'N/A'], ['risk', 1529, 1533, 'N/A'], ['for', 1534, 1537, 'N/A'], ['revascularization', 1538, 1555, 'N/A'], ['procedures', 1556, 1566, 'N/A'], ['*', 1567, 1568, 'N/A'], ['Reduce', 1568, 1574, 'N/A'], ['the', 1575, 1578, 'N/A'], ['risk', 1579, 1583, 'N/A'], ['of', 1584, 1586, 'N/A'], ['hospitalization', 1587, 1602, 'Indication'], ['for', 1603, 1606, 'N/A'], ['CHF', 1607, 1610, 'N/A'], ['*', 1611, 1612, 'N/A'], ['Reduce', 1612, 1618, 'N/A'], ['the', 1619, 1622, 'N/A'], ['risk', 1623, 1627, 'N/A'], ['of', 1628, 1630, 'N/A'], ['angina', 1631, 1637, 'Indication'], ['1.2', 1638, 1641, 'N/A'], ['HyperlipidemiaAtorvastatin', 1642, 1668, 'DRUG'], ['calcium', 1669, 1676, 'DRUG'], ['tablets', 1677, 1684, 'N/A'], ['are', 1685, 1688, 'N/A'], ['indicated*As', 1689, 1701, 'Indication'], ['an', 1702, 1704, 'N/A'], ['adjunct', 1705, 1712, 'N/A'], ['to', 1713, 1715, 'N/A'], ['diet', 1716, 1720, 'N/A'], ['to', 1721, 1723, 'N/A'], ['reduce', 1724, 1730, 'N/A'], ['elevated', 1731, 1739, 'N/A'], ['total', 1740, 1745, 'N/A'], ['-', 1745, 1746, 'N/A'], ['C', 1746, 1747, 'N/A'], [',', 1747, 1748, 'N/A'], ['LDL', 1749, 1752, 'Indication'], ['-', 1752, 1753, 'N/A'], ['C', 1753, 1754, 'N/A'], [',', 1754, 1755, 'N/A'], ['apo', 1756, 1759, 'Indication'], ['B', 1760, 1761, 'Indication'], [',', 1761, 1762, 'N/A'], ['and', 1763, 1766, 'N/A'], ['TG', 1767, 1769, 'Indication'], ['levels', 1770, 1776, 'N/A'], ['and', 1777, 1780, 'N/A'], ['to', 1781, 1783, 'N/A'], ['increase', 1784, 1792, 'N/A'], ['HDL', 1793, 1796, 'Indication'], ['-', 1796, 1797, 'N/A'], ['C', 1797, 1798, 'N/A'], ['in', 1799, 1801, 'N/A'], ['adult', 1802, 1807, 'N/A'], ['patients', 1808, 1816, 'N/A'], ['with', 1817, 1821, 'N/A'], ['primary', 1822, 1829, 'Indication'], ['hypercholesterolemia', 1830, 1850, 'Indication'], ['(', 1851, 1852, 'N/A'], ['heterozygous', 1852, 1864, 'Indication'], ['familial', 1865, 1873, 'Indication'], ['and', 1874, 1877, 'N/A'], ['nonfamilial', 1878, 1889, 'N/A'], [')', 1889, 1890, 'N/A'], ['and', 1891, 1894, 'N/A'], ['mixed', 1895, 1900, 'N/A'], ['dyslipidemia', 1901, 1913, 'Indication'], ['(', 1914, 1915, 'N/A'], ['Fredrickson', 1916, 1927, 'N/A'], ['Types', 1928, 1933, 'N/A'], ['IIa', 1934, 1937, 'N/A'], ['and', 1938, 1941, 'N/A'], ['IIb', 1942, 1945, 'N/A'], [')', 1945, 1946, 'N/A'], [';', 1946, 1947, 'N/A'], ['*', 1948, 1949, 'N/A'], ['As', 1949, 1951, 'N/A'], ['an', 1952, 1954, 'N/A'], ['adjunct', 1955, 1962, 'N/A'], ['to', 1963, 1965, 'N/A'], ['diet', 1966, 1970, 'N/A'], ['for', 1971, 1974, 'N/A'], ['the', 1975, 1978, 'N/A'], ['treatment', 1979, 1988, 'N/A'], ['of', 1989, 1991, 'N/A'], 
  ['adult', 1992, 1997, 'N/A'], ['patients', 1998, 2006, 'N/A'], ['with', 2007, 2011, 'N/A'], ['elevated', 2012, 2020, 'N/A'], ['serum', 2021, 2026, 'N/A'], ['TG', 2027, 2029, 'Indication'], ['levels', 2030, 2036, 'N/A'], ['(', 2037, 2038, 'N/A'], ['Fredrickson', 2039, 2050, 'N/A'], ['Type', 2051, 2055, 'N/A'], ['IV', 2056, 2058, 'N/A'], [')', 2058, 2059, 'N/A'], [';', 2059, 2060, 'N/A'], ['*', 2061, 2062, 'N/A'], ['For', 2062, 2065, 'N/A'], ['the', 2066, 2069, 'N/A'], ['treatment', 2070, 2079, 'N/A'], ['of', 2080, 2082, 'N/A'], ['adult', 2083, 2088, 'N/A'], ['patients', 2089, 2097, 'N/A'], ['with', 2098, 2102, 'N/A'], ['primary', 2103, 2110, 'N/A'], ['dysbetalipoproteinemia', 2111, 2133, 'Indication'], ['(', 2134, 2135, 'N/A'], ['Fredrickson', 2136, 2147, 'N/A'], ['Type', 2148, 2152, 'N/A'], ['III', 2153, 2156, 'N/A'], [')', 2156, 2157, 'N/A'], ['who', 2158, 2161, 'N/A'], ['do', 2162, 2164, 'N/A'], ['not', 2165, 2168, 'N/A'], ['respond', 2169, 2176, 'N/A'], ['adequately', 2177, 2187, 'N/A'], ['to', 2188, 2190, 'N/A'], ['diet', 2191, 2195, 'N/A'], [';', 2195, 2196, 'N/A'], ['*', 2197, 2198, 'N/A'], ['To', 2198, 2200, 'N/A'], ['reduce', 2201, 2207, 'N/A'], ['total', 2208, 2213, 'N/A'], ['-', 2213, 2214, 'N/A'], ['C', 2214, 2215, 'N/A'], ['and', 2216, 2219, 'N/A'], ['LDL', 2220, 2223, 'Indication'], ['-', 2223, 2224, 'N/A'], ['C', 2224, 2225, 'N/A'], ['in', 2226, 2228, 'N/A'], ['patients', 2229, 2237, 'N/A'], ['with', 2238, 2242, 'N/A'], ['homozygous', 2243, 2253, 'Indication'], ['familial', 2254, 2262, 'Indication'], ['hypercholesterolemia', 2263, 2283, 'Indication'], ['(', 2284, 2285, 'N/A'], ['HoFH', 2285, 2289, 'N/A'], [')', 2289, 2290, 'N/A'], ['as', 2291, 2293, 'N/A'], ['an', 2294, 2296, 'N/A'], ['adjunct', 2297, 2304, 'N/A'], ['to', 2305, 2307, 'N/A'], ['other', 2308, 2313, 'N/A'], ['lipid', 2314, 2319, 'N/A'], ['-', 2319, 2320, 'N/A'], ['lowering', 2320, 2328, 'N/A'], ['treatments', 2329, 2339, 'N/A'], ['(', 2340, 2341, 'N/A'], ['e.g.', 2341, 2345, 'N/A'], [',', 2345, 2346, 'N/A'], ['LDL', 2347, 2350, 'Indication'], ['apheresis', 2351, 2360, 'Indication'], [')', 2360, 2361, 'N/A'], ['or', 2362, 2364, 'N/A'], ['if', 2365, 2367, 'N/A'], ['such', 2368, 2372, 'N/A'], ['treatments', 2373, 2383, 'N/A'], ['are', 2384, 2387, 'N/A'], ['unavailable;*As', 2388, 2403, 'N/A'], ['an', 2404, 2406, 'N/A'], ['adjunct', 2407, 2414, 'N/A'], ['to', 2415, 2417, 'N/A'], ['diet', 2418, 2422, 'N/A'], ['to', 2423, 2425, 'N/A'], ['reduce', 2426, 2432, 'N/A'], ['total', 2433, 2438, 'N/A'], ['-', 2438, 2439, 'N/A'], ['C', 2439, 2440, 'N/A'], [',', 2440, 2441, 'N/A'], ['LDL', 2442, 2445, 'Indication'], ['-', 2445, 2446, 'N/A'], ['C', 2446, 2447, 'N/A'], [',', 2447, 2448, 'N/A'], ['and', 2449, 2452, 'N/A'], ['apo', 2453, 2456, 'Indication'], ['B', 2457, 2458, 'Indication'], ['levels', 2459, 2465, 'N/A'], ['in', 2466, 2468, 'N/A'], ['pediatric', 2469, 2478, 'N/A'], ['patients', 2479, 2487, 'N/A'], [',', 2487, 2488, 'N/A'], ['10', 2489, 2491, 'N/A'], ['to', 2492, 2494, 'N/A'], ['17', 2495, 2497, 'N/A'], ['years', 2498, 2503, 'N/A'], ['of', 2504, 2506, 'N/A'], ['age', 2507, 2510, 'N/A'], [',', 2510, 2511, 'N/A'], ['with', 2512, 2516, 'N/A'], ['heterozygous', 2517, 2529, 'Indication'], ['familial', 2530, 2538, 'Indication'], ['hypercholesterolemia', 2539, 2559, 'Indication'], ['(', 2560, 2561, 'N/A'], ['HeFH', 2561, 2565, 'N/A'], [')', 2565, 2566, 'N/A'], ['if', 2567, 2569, 'N/A'], ['after', 2570, 2575, 'N/A'], ['an', 2576, 2578, 'N/A'], ['adequate', 2579, 2587, 'N/A'], ['trial', 2588, 2593, 'N/A'], ['of', 2594, 2596, 'N/A'], ['diet', 2597, 2601, 'N/A'], ['therapy', 2602, 2609, 'N/A'], ['the', 2610, 2613, 'N/A'], ['following', 2614, 2623, 'N/A'], ['findings', 2624, 2632, 'N/A'], ['are', 2633, 2636, 'N/A'], ['present', 2637, 2644, 'N/A'], [':', 2644, 2645, 'N/A'], ['\t ', 2646, 2648, 'N/A'], ['*', 2648, 2649, 'N/A'], ['LDL', 2649, 2652, 'Indication'], ['-', 2652, 2653, 'N/A'], ['C', 2653, 2654, 'N/A'], ['remains', 2655, 2662, 'N/A'], ['=', 2663, 2664, 'N/A'], ['190', 2665, 2668, 'N/A'], ['mg', 2669, 2671, 'N/A'], ['/', 2671, 2672, 'N/A'], ['dL', 2672, 2674, 'N/A'], ['or*LDL', 2675, 2681, 'N/A'], ['-', 2681, 2682, 'N/A'], ['C', 2682, 2683, 'N/A'], ['remains', 2684, 2691, 'N/A'], ['=', 2692, 2693, 'N/A'], ['160', 2694, 2697, 'N/A'], ['mg', 2698, 2700, 'N/A'], ['/', 2700, 2701, 'N/A'], ['dL', 2701, 2703, 'N/A'], ['and:*there', 2704, 2714, 'N/A'], ['is', 2715, 2717, 'N/A'], ['a', 2718, 2719, 'N/A'], ['positive', 2720, 2728, 'N/A'], ['family', 2729, 2735, 'N/A'], ['history', 2736, 2743, 'N/A'], ['of', 2744, 2746, 'N/A'], ['premature', 2747, 2756, 'N/A'], ['cardiovascular', 2757, 2771, 'N/A'], ['disease', 2772, 2779, 'N/A'], ['or*two', 2780, 2786, 'N/A'], ['or', 2787, 2789, 'N/A'], ['more', 2790, 2794, 'N/A'], ['other', 2795, 2800, 'N/A'], ['CVD', 2801, 2804, 'N/A'], ['risk', 2805, 2809, 'N/A'], ['factors', 2810, 2817, 'N/A'], ['are', 2818, 2821, 'N/A'], ['present', 2822, 2829, 'N/A'], ['in', 2830, 2832, 'N/A'], ['the', 2833, 2836, 'N/A'], ['pediatric', 2837, 2846, 'N/A'], ['patient1.3', 2847, 2857, 'N/A'], ['Limitations', 2858, 2869, 'N/A'], ['of', 2870, 2872, 'N/A'], ['UseAtorvastatin', 2873, 2888, 'DRUG'], ['calcium', 2889, 2896, 'DRUG'], ['tablets', 2897, 2904, 'N/A'], ['have', 2905, 2909, 'N/A'], ['not', 2910, 2913, 'N/A'], ['been', 2914, 2918, 'N/A'], ['studied', 2919, 2926, 'N/A'], ['in', 2927, 2929, 'N/A'], ['conditions', 2930, 2940, 'N/A'], ['where', 2941, 2946, 'N/A'], ['the', 2947, 2950, 'N/A'], ['major', 2951, 2956, 'N/A'], ['lipoprotein', 2957, 2968, 'N/A'], ['abnormality', 2969, 2980, 'N/A'], ['is', 2981, 2983, 'N/A'], ['elevation', 2984, 2993, 'N/A'], ['of', 2994, 2996, 'N/A'], ['chylomicrons', 2997, 3009, 'Indication'], ['(', 3010, 3011, 'N/A'], ['Fredrickson', 3012, 3023, 'N/A'], ['Types', 3024, 3029, 'N/A'], ['I', 3030, 3031, 'N/A'], ['and', 3032, 3035, 'N/A'], ['V', 3036, 3037, 'N/A'], [')', 3037, 3038, 'N/A'], ['.', 3038, 3039, 'N/A']];
  const [labels,setLabels] = useState([{value:'DRUG',isSelected:true},{value:'Inidication',isSelected:false}]);
  const [selectedLabel,setSelectedLabel] = useState('DRUG');
  const [csvFile, setCsvFile] = useState();
  var [step,setStep] = useState(1);
  const [csvData,setCsvData] = useState([]);
  var [curIdx,setCurIdx] = useState(-1);
  const [curText,setCurText] = useState();
  const [curTextArray,setCurTextArray] = useState([]);
  var [nextBtn,setNextBtn] = useState(false);
  var [loading,setLoading] = useState(false);
  var [hasSubmitted,setHasSubmitted] = useState(false);

  useEffect(()=>{
    if(csvData.length==0)return;
    // console.log(csvData);
    nextDoc();
  },[csvData])

  useEffect(async()=>{
    if(curIdx===-1)return;
    if(curIdx===csvData.length){
      setStep(3);
      return;
    }else{
      const curTextToBeAnnotated = csvData[curIdx][0]; 
      const headers = {
        'Content-Type': 'application/json'
      };
      const params = {
        'text':curTextToBeAnnotated
      }
      await axios.post('/get-annotated-text',params,headers).then((res)=>{
        const curTextArrayToBeAnnotated = res.data.tags;
        curTextArrayToBeAnnotated.splice(0,1);
        // console.log(curTextArrayToBeAnnotated[curTextArrayToBeAnnotated.length-1]);
        if(curTextArrayToBeAnnotated[curTextArrayToBeAnnotated.length-1][0]!='"')curTextArrayToBeAnnotated.splice(curTextArrayToBeAnnotated.length-2,1);
        else curTextArrayToBeAnnotated.splice(curTextArrayToBeAnnotated.length-1,1);
        console.log(curTextArrayToBeAnnotated);
        setCurText(curTextToBeAnnotated);
        // console.log(document.getElementById('content').children);
        setCurTextArray(curTextArrayToBeAnnotated);
      })
    }
  },[curIdx])

  useEffect(()=>{
    if(curTextArray.length == 0)return;
    document.getElementById('content').innerHTML = '';
    var idx=0;
    while(idx < curTextArray.length){
      if(curTextArray[idx][3]=='N/A'){
        const spanElem = document.createElement('span');
        spanElem.classList.add('inline-block','px-1','py-1','text-gray-700','mr-1','mb-2');
        spanElem.innerHTML =  `${curTextArray[idx][0]}`;
        document.getElementById('content').appendChild(spanElem);
      }else{
        const spanElem = document.createElement('span');
        const curTag = curTextArray[idx][3];
        while(idx<curTextArray.length && curTextArray[idx][3]==curTag){
          const innerSpanElem = document.createElement('span');
          innerSpanElem.classList.add('mr-1');
          innerSpanElem.innerHTML =  `${curTextArray[idx][0]}`;
          spanElem.appendChild(innerSpanElem);
          idx++;
        }
        const categorySpan = document.createElement('span');
        categorySpan.innerText = curTag;
        categorySpan.classList.add('Category','rounded-full','text-xs','p-1');
        spanElem.appendChild(categorySpan);
        addDeleteToSpan(spanElem);
        spanElem.classList.add('Filter','rounded','inline-block','px-1','py-1','text-gray-700','mr-1','mb-2','font-semibold','cursor-pointer');
        spanElem.addEventListener('click',unmark);
        document.getElementById('content').appendChild(spanElem);
        idx--;
      }
      idx++;
    }
    setLoading(false);
  },[curTextArray]);


  const addDeleteToSpan = (spanElem) => {
    const deleteBtn = document.createElement('span');
    deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 svg-cross" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>'
    deleteBtn.classList.add('deleteBtn','invisible');
    deleteBtn.addEventListener('click',unmark);
    spanElem.appendChild(deleteBtn);
    spanElem.addEventListener('mouseover',()=>{
      deleteBtn.classList.remove('invisible');
    })
    spanElem.addEventListener('mouseout',()=>{
      deleteBtn.classList.add('invisible');
    })
  }


  const downloadCSVFile = ()=>{
    // let header = ['NER'].join(',') + '\n';
    let csv = '';
    finalArray.forEach( (array,idx) => {
        // console.log(csvData[idx][0],array);
        if(csvData[idx][0].substr(csvData[idx][0].length-1,1)=='\r')csv += String(csvData[idx][0].substr(0,csvData[idx][0].length-1));
        else csv += String(csvData[idx][0]);
        csv += ",";
        csv += String(array)+"\n";
    });
 
    let csvDataInner = new Blob([csv], { type: 'text/csv' });  
    let csvUrl = URL.createObjectURL(csvDataInner);
 
    let hiddenElement = document.createElement('a');
    hiddenElement.href = csvUrl;
    hiddenElement.target = '_blank';
    hiddenElement.download = 'output' + '.csv';
    hiddenElement.click();
  }

  const submit = () => {
    const file = csvFile;
    const reader = new FileReader();

    reader.onload = async function(e) {
        const text = e.target.result;
        var allTextLines = text.split(/\n/);
        var lines = [];
        for (var i=0; i<allTextLines.length; i++) {
          lines.push([allTextLines[i]]);
        }
        // console.log(lines);
        setCsvData(lines);
    }

    reader.readAsText(file);
  }

  // add a new label
  const addLabel = ()=> {
    setLabels(labels => [...labels,{value:document.getElementById('label').value,isSelected:false}]);
    // if there are no labels then make the current label selected
    if(selectedLabel === null){
      setSelectedLabel(document.getElementById('label').value);
      setLabels(labels => {
        labels[0].isSelected = true;
        return labels;
      })
    }
  }

  // selecting a new label
  const selectLabel = (event)=> {
    const canvasLabels = document.getElementById('labels').children;
    for(let i=0;i<labels.length;i++){
      // removing the selected-label-css from the previous selected label
      if(labels[i].isSelected){
        setLabels(labels => {
          labels[i].isSelected = false;
          return labels;
        });
        break;
      }
    }
    // finding the index of the current selected label
    const idx = Array.from(canvasLabels).indexOf(event.target);

    // selecting the new label 
    setSelectedLabel(event.target.innerText);
    setLabels(labels => {
      labels[idx].isSelected = true;
      return labels;
    });
  }

  // make a new selection
  const tagSelectionWithCurrentLabel = ()=>{
    // console.log(window.getSelection());
    // if its a click event then the selected area is empty so return
    if(window.getSelection().toString() === "")return;

    // fetches a list of all the selected elements
    const [selectedSpans,startOffset,endOffset] = getSelectedElementTags();

    // create a new span element that will hold all the span elements that are selected
    const marked = document.createElement('span');

    // get all the existing tokens
    const tokensDiv = document.getElementById('content');

    const numSpans = selectedSpans.length;

    // get the next span element which is not a part of selection 
    // we will add newly created marked span before it
    var nextSpan = selectedSpans[numSpans-1].nextSibling;

    // for checking if any of the current selected elements are already marked
    for(let i=0;i<numSpans;i++){

      // if they have class Filter than they are already marked and hence return
      // also to get rid of all the selected ranges so as to make canvas selection free
      if(selectedSpans[i].parentElement.classList.contains('Filter')){
        window.getSelection().removeAllRanges();
        return;
      }
    }
    // console.log(selectedSpans[0].innerText,selectedSpans[numSpans-1].innerText);
    // console.log(startOffset,endOffset,selectedSpans[0].innerText.length,selectedSpans[numSpans-1].innerText.length);
    var startNode,endNode;
    for(let i=0;i<numSpans;i++){

      // if there are more than one selected elements, the first element is the parent element
      // so ignoring it
      if(i===0 && numSpans > 1)continue;
      if(((i==0&&numSpans==1)||i==1) && startOffset!=0){
        startNode = document.createElement('span');
        startNode.innerHTML = `${selectedSpans[i].innerText.substr(0,startOffset)}`;
        startNode.classList.add('inline-block','px-1','py-1','text-gray-700','mr-1','mb-2','startNode');
        selectedSpans[i].innerHTML = `${selectedSpans[i].innerText.substr(startOffset,selectedSpans[i].length)}`
      }if(i==numSpans-1 && endOffset!=selectedSpans[i].innerText.length){
        endNode = document.createElement('span');
        endNode.innerHTML = `${selectedSpans[numSpans-1].innerText.substr(endOffset,selectedSpans[i].length)}`;
        endNode.classList.add('inline-block','px-1','py-1','text-gray-700','mr-1','mb-2','endNode');
        selectedSpans[i].innerHTML = `${selectedSpans[i].innerText.substr(0,endOffset)}`
      }
      selectedSpans[i].classList.remove('inline-block','text-gray-700','mr-1','mb-2');
      // removing the current selected elements from the canvas
      tokensDiv.removeChild(selectedSpans[i]);

      // adding the selected element in the marked span
      marked.appendChild(selectedSpans[i]);
    }

    // appending a label category at the end
    const labelCategorySpan = document.createElement('span');
    labelCategorySpan.innerText = selectedLabel;
    labelCategorySpan.classList.add('Category','rounded-full','text-xs','p-1');
    marked.classList.add('inline-block','px-1','py-1','text-gray-700','mr-1','mb-2','font-semibold','cursor-pointer');
    marked.appendChild(labelCategorySpan);
    addDeleteToSpan(marked);

    // adding selected elements css
    marked.classList.add('Filter','rounded');
    marked.id = "Filter"+String(nextSpan.innerText);

    // adding a click event listener on the marked span 
    // so if the selected span is clicked, we can undo the selection
    marked.addEventListener('click',unmark);

    if(endNode){
      tokensDiv.insertBefore(endNode,nextSpan);
      nextSpan = endNode;
    }
    // finally the marked span with all the chilren span can be inserted into the canvas
    tokensDiv.insertBefore(marked,nextSpan);
    if(startNode){
      tokensDiv.insertBefore(startNode,marked);
    }
  }

  const getMarkedNode = (elem) => {
    if(elem.parentElement.classList.contains('svg-cross'))return elem.parentElement.parentElement.parentElement;
    else if(elem.parentElement.classList.contains('deleteBtn'))return elem.parentElement.parentElement;
    else return elem.parentElement;
  }

  const unmark = (event)=>{
    // console.log("here2");
    const parent = event.target.parentElement;
    const marked = getMarkedNode(event.target);
    // getting the next sibling of the marked span 
    // so that we will add its children elements before it back as they were
    var nextSibling = marked.nextSibling;

    // all the children elements
    const childSpans = marked.children;
      
    // removing the highlighted span from the canvas
    const tokensDivElems = document.getElementById('content');
    tokensDivElems.removeChild(marked);

    // getting the index of the next sibling
    var idx = Array.from(nextSibling.parentNode.children).indexOf(nextSibling);
    var nextElem = tokensDivElems.children[idx];
    var prevElem = tokensDivElems.children[idx-1];
    // console.log(nextElem,prevElem);
    const childSpansLength = childSpans.length;
    // going from the right to left as the elements are added in that order
    // the last element of the children of marked is ignore as we dont want to add category label back
    for(let i=childSpansLength-3;i>=0;i--){
      // tokenDivElems.children[idx] is the nextSibling (we need html node)
      // we add the current child element back where it originally was 
      childSpans[i].classList.remove('font-semibold');
      childSpans[i].classList.add('inline-block','px-1','py-1','text-gray-700','mr-1','mb-2');
      if(i==childSpansLength-3){
        if(nextElem.classList.contains('endNode')){
          const len = nextElem.innerText.length;
          const len2 = childSpans[i].innerText.length;
          childSpans[i].innerHTML = `${childSpans[i].innerText}${nextElem.innerText}`;
          tokensDivElems.removeChild(nextElem);
        }
      }
      if(i==0){
        // console.log(prevElem);
        if(prevElem && prevElem.classList.contains('startNode')){
          const len = prevElem.innerText.length;
          const len2 = childSpans[i].innerText.length;
          childSpans[i].innerHTML = `${prevElem.innerText}${childSpans[i].innerText}`;
          tokensDivElems.removeChild(prevElem);
          idx--;
        }
      }
      tokensDivElems.insertBefore(childSpans[i],tokensDivElems.children[idx]);
    }
    // mouse up event propagation can be stopped right here
    event.stopPropagation();
  }

  const getSpanText = (spanElem) => {
    const children = spanElem.children;
    var spanText = '';
    for(let i=0;i<children.length-2;i++){
      spanText += children[i].innerText;
    }
    return spanText;
  } 

  const submitAnnotation = ()=>{
    const spans = document.getElementById('content').children;
    const csvText = csvData[curIdx][0];
    var idx=0,relidx=0;
    const elems = [];
    while(idx < csvText.length){
      if(relidx >= spans.length)break; //fallback
      const spanText = spans[relidx].classList.contains('Filter') ? getSpanText(spans[relidx]) : spans[relidx].innerText;
      var start=-1,end=-1,innerIdx=0;
      console.log(spanText,csvText,csvText[idx]);
      while(innerIdx < spanText.length){
        // console.log(csvText[idx],spanText[innerIdx],idx,innerIdx,spanText.length);
        if(csvText[idx] == spanText[innerIdx]){
          if(start==-1)start=idx;
          idx++;
          innerIdx++;
        }else idx++;
        if(innerIdx==spanText.length)end=idx-1;
      }
      if(spans[relidx].classList.contains('Filter')){
        const spanChildren = spans[relidx].children;
        elems.push([start-1,end,spanChildren[spanChildren.length-2].innerText]);
      }
      relidx++;
    }
    // console.log(elems);
    finalArray.push(elems);
    // console.log(finalArray);
    setHasSubmitted(true);
    setInterval(()=>{
      setHasSubmitted(false);
    },2000);
    setNextBtn(true);
  }

  const removeChildFromCanvas = (child,parent) => {
    new Promise(resolve => parent.removeChild(child));
  }

  const nextDoc = ()=>{
    setLoading(true);
    const spans = document.getElementById('content').children;
    const childrenToBeDeleted = [];
    for(let i=0;i<spans.length;i++){
      if(spans[i].classList.contains('Filter')){
        childrenToBeDeleted.push(spans[i]);
      }
    }
    Promise.all(childrenToBeDeleted.map(async child=>{
      await removeChildFromCanvas(child,document.getElementById('content'));
    })).then(()=>{
      setCurIdx(curIdx+1);
    });
    setNextBtn(false);
  }

  return (
    <div className="App h-screen overflow-auto">
      {/* <Header /> */}
      {step==2 ? 
      (<div>
      {/* <CRow> */}
        {/* All the tokens canvas */}
        {/* <CCol> */}
        <div className="flex">
          <div className="w-3/4">
            
            <div onMouseUp ={tagSelectionWithCurrentLabel} className="p-2 m-1 rounded overflow-hidden shadow-lg bg-white">
              
              <div id="content" className="text-lg" style={loading ? {display:'none'} : {display:''}}>
          
              </div>
              <div className="flex items-center justify-center" style={loading? {display:''} : {display:'none'}}>
                  <div className="w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
              </div>
  
            </div>
            <div>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2" onClick={submitAnnotation} disabled={loading}>Submit</button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" onClick={nextDoc} disabled={!nextBtn}>Next</button>
              <div className="text-white px-2 py-2 border-0 rounded relative mb-2 bg-green-500" style={hasSubmitted? {display:''} : {display:'none'}}>
                <span className="inline-block align-middle mr-8">
                  <b className="capitalize">Updated Annotation Submitted successfully!</b> 
                </span>
              </div>
            </div>
          </div>
          <div className="w-1/4 m-1">
            <input type="text" id="label" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter Label"/>
            <button onClick={addLabel} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded m-2">Add Tag</button>
          <div id="labels">
            {labels.map((label)=> <div onClick={selectLabel} className={label.isSelected ? "Label SelectedLabel rounded" : "Label rounded"}>{label.value}</div>)}
          </div>
        </div>
        </div>
      </div>)
      : 
      (<div></div>)}
      {step==1 ?
      (<div className="flex justify-center">
        <div className="max-w-2xl p-2 rounded overflow-hidden shadow-lg bg-white">
          <h2>Upload the CSV File for Annotation</h2>
          <form id='csv-form'>
            <input type='file' accept='.csv' id='csvFile' onChange={(e) => {setCsvFile(e.target.files[0]) }}></input>
            <br/>
            <button
              onClick={(e) => {
                  e.preventDefault();
                  if(csvFile){
                    submit();
                    setStep(2);
                  }else{
                    alert("Please Upload CSV File");
                  }
              }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
            </button>
          </form>
        </div>
      </div>) : (<div></div>)}
      {step==3 ? 
      (<div>
        {/* <CCol> */}
          <button onClick={downloadCSVFile} class="bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 m-2 rounded inline-flex items-center">
            <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
            <span>Download CSV</span>
          </button>
          <button onClick={()=>setStep(1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded">New Annotation Task</button>
        {/* </CCol> */}
      </div>) 
      : (<div></div>)}
    </div>
  );
}

export default App;
