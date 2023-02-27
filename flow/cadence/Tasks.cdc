pub contract TasksList {

    pub var tasks: [String]

    pub fun addTask(newURL: String) {
        self.tasks.append(newURL)
    }

    init() {
        self.tasks = []
    }

}
