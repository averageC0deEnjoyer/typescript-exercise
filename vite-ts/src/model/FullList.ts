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
  // static can be called even though no instance yet
  static instance: FullList = new FullList();

  constructor(private _list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    //retrieve item from localstorage
    const storedItems: string | null = localStorage.getItem('myItems');
    if (typeof storedItems !== 'string') return;

    const parsedItems: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedItems);
    //TODO console.log(parsed item store item)
    parsedItems.forEach((itemObj) => {
      const newListItem = new ListItem(
        itemObj._id,
        itemObj._item,
        itemObj._checked
      );
      //this using FullList not this._list cause at first we want to initalize instance
      FullList.instance.addItem(newListItem);
      // why here cant i just this._list.push(newListItem) // i think can but back to DRY problem
    });
  }

  save(): void {
    localStorage.setItem('myItems', JSON.stringify(this._list));
  }

  clearList(): void {
    this._list = [];
    // localStorage.removeItem('myItems');
    this.save();
  }

  addItem(item: ListItem): void {
    this._list.push(item);
    this.save();
  }

  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id === id);
    this.save();
  }
}
