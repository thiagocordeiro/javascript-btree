export class IndexedNode {
    constructor(index, data = null) {
        this.index = index;
        this.data = data;
        this.right = null;
        this.left = null;
    }

    insert(index, data) {
        index < this.index ? this._insertOnLeft(index, data) : this._insertOnRight(index, data)

        return this;
    }

    _insertOnLeft(index, data) {
        if (this.left) {
            this.left.insert(index, data);

            return;
        }

        this.left = new IndexedNode(index, data);
    }

    _insertOnRight(index, data) {
        if (this.right) {
            this.right.insert(index, data);

            return;
        }

        this.right = new IndexedNode(index, data);
    }

    search(index) {
        if (this.index === index) {
            return this;
        }

        return index < this.index ? this._searchOnLeft(index) : this._searchOnRight(index);
    }

    _searchOnLeft(index) {
        if (!this.left) {
            return;
        }

        return this.left.search(index);
    }

    _searchOnRight(index) {
        if (!this.right) {
            return;
        }

        return this.right.search(index);
    }

    delete(index) {
        if (!this.left && !this.right) {
            return;
        }

        if (this.left && this.left.index === index) {
            this._deleteNodeOnLeft();

            return;
        }

        if (this.right && this.right.index === index) {
            this._deleteNodeOnRight();

            return;
        }

        return index < this.index ? this.left.delete(index) : this.right.delete(index);
    }

    _deleteNodeOnLeft() {
        if (this.left.right) {
            this.left = this.left.right;

            return;
        }

        if (this.left.left) {
            this.left = this.left.left;

            return;
        }

        this.left = null;
    }

    _deleteNodeOnRight() {
        if (this.right.right) {
            this.right = this.right.right;

            return;
        }

        if (this.right.left) {
            this.right = this.right.left;

            return;
        }

        this.right = null;
    }
}
