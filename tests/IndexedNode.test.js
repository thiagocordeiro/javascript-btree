import { IndexedNode } from "../src/Node/IndexedNode";

describe('IndexedNode', () => {
    it('when insert lower value then save on left side', () => {
        let node = new IndexedNode(10);

        node.insert(5);

        expect(node.left.index).toBe(5);
    });

    it('when insert higher value then save on right side', () => {
        let node = new IndexedNode(10);

        node.insert(15);

        expect(node.right.index).toBe(15);
    });

    it('when insert more then once higher value then save nested on right', () => {
        let node = new IndexedNode(10)
            .insert(15)
            .insert(17)
            .insert(20)
        ;

        expect(node.right.right.right.index).toBe(20);
    });

    it('when insert more then once lower value then save nested on left', () => {
        let node = new IndexedNode(10)
            .insert(8)
            .insert(7)
            .insert(5)
        ;

        expect(node.left.left.left.index).toBe(5);
    });

    it('when insert alternatively then create tree accordingly', () => {
        let node = new IndexedNode(10)
            .insert(15) // right
            .insert(12) // right.left
            .insert(19) // right.right
            .insert(13) // right.left.right
            .insert(14) // right.left.right.right
            .insert(11) // right.left.left
            .insert(2) // left
            .insert(3) // left.right
            .insert(1) // left.left
            .insert(9) // left.right.right
            .insert(8) // left.right.right.left
        ;

        expect(node.right.index).toBe(15);
        expect(node.right.left.index).toBe(12);
        expect(node.right.right.index).toBe(19);
        expect(node.right.left.right.index).toBe(13);
        expect(node.right.left.right.right.index).toBe(14);
        expect(node.right.left.left.index).toBe(11);

        expect(node.left.index).toBe(2);
        expect(node.left.right.index).toBe(3);
        expect(node.left.left.index).toBe(1);
        expect(node.left.right.right.index).toBe(9);
        expect(node.left.right.right.left.index).toBe(8);
    });

    it('When given an index then search within the tree', () => {
        let node = new IndexedNode(10)
            .insert(15, 'A')
            .insert(12, 'B')
            .insert(19, 'C')
            .insert(13, 'D')
            .insert(14, 'E')
            .insert(11, 'F')
            .insert(2, 'G')
            .insert(3, 'H')
            .insert(1, 'I')
            .insert(9, 'J')
            .insert(8, 'K')
        ;

        expect(node.search(8).data).toBe('K');
    });

    it('When given an index and it has node on right Then replace by right node', () => {
        let node = new IndexedNode(10)
            .insert(10, 'A')
            .insert(30, 'B')
            .insert(12, 'C')
            .insert(11, 'D')
            .insert(13, 'E')
            .insert(14, 'F')
            .insert(22, 'G')
            .insert(21, 'H')
            .insert(26, 'I')
            .insert(19, 'J')
            .insert(28, 'K')
        ;

        node.delete(22);

        expect(node.search(14).right.index).toBe(26);
    });

    it('When given an index and it has no right node but has on left Then replace by left node', () => {
        let node = new IndexedNode(10)
            .insert(10, 'A')
            .insert(30, 'B')
            .insert(12, 'C')
            .insert(11, 'D')
            .insert(13, 'E')
            .insert(14, 'F')
            .insert(22, 'G')
            .insert(21, 'H')
            .insert(19, 'J')
        ;

        node.delete(22);

        expect(node.search(14).right.index).toBe(21);
    });

    it('When given an index and it no children Then set to null on its parent', () => {
        let node = new IndexedNode(10)
            .insert(10, 'A')
            .insert(30, 'B')
            .insert(12, 'C')
            .insert(11, 'D')
            .insert(13, 'E')
            .insert(14, 'F')
            .insert(22, 'G')
            .insert(21, 'H')
            .insert(19, 'J')
        ;

        node.delete(19);

        parent = node.search(21);
        expect(parent.left || parent.right).toBeUndefined();
    });
});
