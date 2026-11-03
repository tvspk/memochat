# Rules for working on MemoChat

- **The gambling thread ("Bet…", 🎲) was removed for good.** It must never come back: not among the default
  threads, not in tests, sample data, docs, commit messages or release notes. The owner asked for this explicitly.
  `scripts/build_sw.py` and the GitHub Actions workflow stop with an error if the word appears anywhere in the repository.
- The default threads are: Inbox, Work, Home, Shopping, Ideas, Korean, Welsh, Claude, Copilot, AI general, NHL, Cycling, Skiing.
- After every change run `python3 scripts/build_sw.py` (see README).
