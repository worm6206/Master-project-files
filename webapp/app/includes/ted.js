var postOrderWalk, ted, tedBt, trackedMin, zero;

// ref = require('./util'), Mapping = ref.Mapping, zero = ref.zero, trackedMin = ref.trackedMin;

postOrderWalk = function(root, childrenCb, visitCb) {
  var child, children, firstChild, index, k, len, node, ref1, ref2, ref3, ref4, stack1, stack2;
  stack1 = [];
  stack2 = [];
  stack1.push([void 0, root]);
  while (stack1.length > 0) {
    ref1 = stack1.pop(), index = ref1[0], node = ref1[1];
    children = childrenCb(node);
    firstChild = (ref2 = children != null ? children[0] : void 0) != null ? ref2 : null;
    stack2.push([index, node, firstChild]);
    ref3 = children != null ? children : [];
    for (index = k = 0, len = ref3.length; k < len; index = ++k) {
      child = ref3[index];
      stack1.push([index, child]);
    }
  }
  while (stack2.length > 0) {
    ref4 = stack2.pop(), index = ref4[0], node = ref4[1], firstChild = ref4[2];
    visitCb(index, node, firstChild);
  }
};

ted = function(rootA, rootB, childrenCb, insertCb, removeCb, updateCb, rng) {
  var fdist, i, j, k, l, len, len1, preprocess, ref1, ref2, tA, tB, tdist, tdistance, treeDistance, ttrack;
  preprocess = function(root) {
    var t;
    t = {
      nodes: [],
      llds: [],
      keyroots: []
    };
    postOrderWalk(root, childrenCb, function(index, node, firstChild) {
      var childIndex, lldIndex, nIndex;
      nIndex = t.nodes.length;
      t.nodes.push(node);
      if (firstChild == null) {
        lldIndex = nIndex;
      } else {
        childIndex = t.nodes.indexOf(firstChild);
        lldIndex = t.llds[childIndex];
      }
      t.llds.push(lldIndex);
      if (index !== 0) {
        t.keyroots.push(nIndex);
      }
    });
    t.keyroots.sort();
    return t;
  };
  treeDistance = function(i, j) {
    var a, aL, aN, b, bL, bN, iOff, jOff, k, l, m, min, n, o, p, q, r, ref1, ref2, ref3, ref4;
    aL = tA.llds;
    bL = tB.llds;
    aN = tA.nodes;
    bN = tB.nodes;
    iOff = aL[i] - 1;
    jOff = bL[j] - 1;
    m = i - aL[i] + 2;
    n = j - bL[j] + 2;
    for (a = k = 1, ref1 = m; k < ref1; a = k += 1) {
      fdist[a][0] = fdist[a - 1][0] + removeCb(aN[a + iOff],rng);
    }
    for (b = l = 1, ref2 = n; l < ref2; b = l += 1) {
      fdist[0][b] = fdist[0][b - 1] + insertCb(bN[b + jOff],rng);
    }
    for (a = o = 1, ref3 = m; o < ref3; a = o += 1) {
      for (b = r = 1, ref4 = n; r < ref4; b = r += 1) {
        if (aL[i] === aL[a + iOff] && bL[j] === bL[b + jOff]) {
          min = trackedMin(fdist[a - 1][b] + removeCb(aN[a + iOff],rng), fdist[a][b - 1] + insertCb(bN[b + jOff],rng), fdist[a - 1][b - 1] + updateCb(aN[a + iOff], bN[b + jOff], rng));
          ttrack[a + iOff][b + jOff] = min.index;
          tdist[a + iOff][b + jOff] = fdist[a][b] = min.value;
        } else {
          p = aL[a + iOff] - 1 - iOff;
          q = bL[b + jOff] - 1 - jOff;
          fdist[a][b] = Math.min(fdist[a - 1][b] + removeCb(aN[a + iOff],rng), fdist[a][b - 1] + insertCb(bN[b + jOff],rng), fdist[p][q] + tdist[a + iOff][b + jOff]);
        }
      }
    }
  };
  tA = preprocess(rootA);
  tB = preprocess(rootB);
  ttrack = zero(tA.nodes.length, tB.nodes.length);
  tdist = zero(tA.nodes.length, tB.nodes.length);
  fdist = zero(tA.nodes.length + 1, tB.nodes.length + 1);
  ref1 = tA.keyroots;
  for (k = 0, len = ref1.length; k < len; k++) {
    i = ref1[k];
    ref2 = tB.keyroots;
    for (l = 0, len1 = ref2.length; l < len1; l++) {
      j = ref2[l];
      treeDistance(i, j);
    }
  }
  tdistance = tdist[tA.nodes.length - 1][tB.nodes.length - 1];
  return new Mapping(tA, tB, tdistance, ttrack, tedBt);
};

tedBt = function(tA, tB, ttrack) {
  var i, j, mapping;
  mapping = [];
  i = tA.nodes.length - 1;
  j = tB.nodes.length - 1;
  while (i >= 0 && j >= 0) {
    switch (ttrack[i][j]) {
      case 0:
        mapping.push([tA.nodes[i], null]);
        --i;
        break;
      case 1:
        mapping.push([null, tB.nodes[j]]);
        --j;
        break;
      case 2:
        mapping.push([tA.nodes[i], tB.nodes[j]]);
        --i;
        --j;
        break;
      default:
        throw new Error("Invalid operation " + ttrack[i][j] + " at (" + i + ", " + j + ")");
    }
  }
  if (i === -1 && j !== -1) {
    while (j >= 0) {
      mapping.push([null, tB.nodes[j]]);
      --j;
    }
  }
  if (i !== -1 && j === -1) {
    while (i >= 0) {
      mapping.push([tA.nodes[i], null]);
      --i;
    }
  }
  return mapping;
};

// module.exports = ted;
