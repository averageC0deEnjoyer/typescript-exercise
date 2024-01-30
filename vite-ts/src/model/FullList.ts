import ListItem from './ListItem';

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  //singleton
  static instance: FullList = new FullList();

  constructor(private _list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this._list;
  }

  load() {
    if (localStorage.getItem('myItems')) {
      const parsedItemslocalStorage = JSON.parse(
        localStorage.getItem('myItems')
      );
    }
  }

  save(): void {
    localStorage.setItem('myItems', JSON.stringify(this._list));
  }

  clearList() {
    this._list = [];
    localStorage.removeItem('myItems');
  }

  addItem(item: { _id: string; _item: string; _checked: boolean }) {
    this._list.push(item);
    this.save();
  }

  removeItem(id) {
    this._list = this._list.filter(item.id === id);
    this.save();
  }
}
