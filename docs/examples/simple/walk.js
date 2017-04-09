function walkSimple(VAX) {
    var trees = VAX.composeTreesInlined();

    if (trees.length !== 1) {
        return alert("There should be exactly one tree!");
    }

    var root = trees[0];

    var walkOuter = function walk(node) {
        if (!node) {
            return '';
        }

        switch (node.c) {
            case 'Literal':
                return parseFloat(node.a.V);

            case 'Plus':
                return walk(node.links.A) + walk(node.links.B);

            default:
                throw new Error("Unsupported node component: " + node.component);
        }
    };

    return walkOuter(root);
}