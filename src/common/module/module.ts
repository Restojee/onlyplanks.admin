interface ModuleOptions {
  id: string;
  providers: Record<string, any>
}
class Module {

  protected id: string;
  protected providers: ModuleOptions['providers'];
  

  constructor(options: ModuleOptions) {
    this.setProviders(options.providers)
    this.setId(options.id)
  }

  protected setId(id: ModuleOptions['id']) {
    this.id = id;
  }

  protected setProviders(providers: ModuleOptions['providers']) {
    this.providers = providers;
  }
}

export default Module;