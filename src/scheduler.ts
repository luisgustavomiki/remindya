import { Agenda, Job, JobAttributesData } from 'agenda';
import { Service } from 'typedi';

@Service()
export class Scheduler {
  private readonly connectionString: string;
  private agenda?: Agenda;

  constructor() {
    this.connectionString = 'mongodb://root:rootpassword@persistence/agenda';
  }

  async bootstrap(): Promise<void> {
    this.agenda = new Agenda({ db: { address: this.connectionString } });
    this.agenda.define('ring', {}, this.ring.bind(this));
    await this.agenda.start();
  }

  async schedule(when: Date, data: unknown): Promise<void> {
    await this.agenda?.schedule(when, 'ring', data);
  }

  private ring(job: Job<JobAttributesData>): void {
    console.log('ring %s', job.attrs.data);
  }
}
