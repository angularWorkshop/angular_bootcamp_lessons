import { ProjectStatusVm } from '../contracts/project-status.vm';

export function presentProjectStatus(vm: ProjectStatusVm): string {
  return `${vm.name} • ${vm.status}`;
}
