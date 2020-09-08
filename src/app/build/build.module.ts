import { NgModule } from "@angular/core";
import { BuildComponent } from "./build.component";
import { CommonModule } from "@angular/common";
import { StepsComponent } from "./steps/steps.component";
import { StepComponent } from "./steps/step/step.component";
import { TerminalComponent } from "./terminal/terminal.component";
import { BuildManageComponent } from "./build-manage/build-manage.component";
import { BuildInfoComponent } from "./build-info/build-info.component";
import { CleanTextPipe } from "../clean-text.pipe";
import { FormatDurationPipe } from "../format-duration.pipe";

@NgModule({
  declarations: [
    BuildComponent,
    StepsComponent,
    StepComponent,
    TerminalComponent,
    BuildManageComponent,
    BuildInfoComponent,
    CleanTextPipe,
    FormatDurationPipe,
  ],
  imports: [CommonModule],
  exports: [BuildComponent],
})
export class BuildModule {}
