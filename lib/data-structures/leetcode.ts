export class ListNode {
  val = 0;
  next: ListNode | null = null;

  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export class TreeNode {
  val = 0;
  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(
    val = 0,
    left: TreeNode | null = null,
    right: TreeNode | null = null,
  ) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
