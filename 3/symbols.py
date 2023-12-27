with open('input.in', 'r') as input_file:
    acc = set();
    for line in input_file:
        for c in line:
            acc.add(c);
    print(acc);