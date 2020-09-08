import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  Input,
} from "@angular/core";

@Component({
  selector: "app-terminal",
  templateUrl: "./terminal.component.html",
  styleUrls: ["./terminal.component.scss"],
})
export class TerminalComponent implements AfterViewChecked {
  @Input() logs: string[];
  @ViewChild("terminal") private terminalEle: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.terminalEle.nativeElement.scrollTop =
        this.terminalEle.nativeElement.scrollHeight - 350;
    } catch (err) {}
  }
}
