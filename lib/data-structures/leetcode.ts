export class ListNode {
  val: number = 0;
  next: ListNode | null = null;

  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export class TreeNode {
  val: number = 0;
  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(
    val: number = 0,
    left: TreeNode | null = null,
    right: TreeNode | null = null
  ) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
